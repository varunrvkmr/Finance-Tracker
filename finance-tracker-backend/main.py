from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends
import pandas as pd
from app.normalizers.visa import parse_visa_csv
from app.normalizers.mastercard import parse_mastercard_csv
from app.categorizer import assign_category
from app.database import engine
from app.models import Base
from app.database import SessionLocal
from app.models import Transaction
from datetime import datetime
from sqlalchemy.orm import Session


app = FastAPI()
Base.metadata.create_all(bind=engine)

# ✅ Allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/upload/")
async def upload_file(
    card_type: str = Form(...),
    file: UploadFile = File(...)
):
    df = pd.read_csv(file.file)

    if card_type.lower() == "visa":
        df = parse_visa_csv(df)
    elif card_type.lower() == "mastercard":
        df = parse_mastercard_csv(df)
    else:
        return {"error": "Unsupported card type"}

    df["category"] = df.apply(assign_category, axis=1)

    # Save to DB
    db = SessionLocal()
    for _, row in df.iterrows():
        db_transaction = Transaction(
            date=datetime.strptime(row["date"], "%m/%d/%Y"),
            description=row["description"],
            amount=row["amount"],
            category=row["category"],
            card_type=card_type,
        )
        db.add(db_transaction)
    db.commit()
    db.close()
    
    print(f"✅ Saved {len(df)} transactions to the database.")

    return df.to_dict(orient="records")

@app.get("/transactions/")
def read_transactions(db: Session = Depends(get_db)):
    transactions = db.query(Transaction).order_by(Transaction.date.desc()).all()
    return [
        {
            "id": tx.id,
            "date": tx.date.strftime("%m/%d/%Y"),
            "description": tx.description,
            "amount": tx.amount,
            "category": tx.category,
            "card_type": tx.card_type,
        }
        for tx in transactions
    ]