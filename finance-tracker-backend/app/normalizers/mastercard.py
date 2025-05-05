def parse_mastercard_csv(df):
    df = df.rename(columns={
        "Transaction Date": "date",
        "Description": "description",
        "Amount (USD)": "amount",
        "Category": "category"
    })
    df["amount"] = df["amount"].astype(float)
    return df[["date", "description", "amount", "category"]]
