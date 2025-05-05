def parse_visa_csv(df):
    df = df.rename(columns={
        "Date": "date",
        "Description": "description",
        "Debit": "amount",  # Debit = spending
        "Credit": "credit",  # might be NaN
    })
    df["amount"] = df["amount"].fillna(0).astype(float)
    df["category"] = None  # Visa CSV lacks it
    return df[["date", "description", "amount", "category"]]
