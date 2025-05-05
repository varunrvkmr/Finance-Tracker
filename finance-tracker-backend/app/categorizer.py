import pandas as pd

CATEGORY_MAP = {
    "starbucks": "Food & Drink",
    "amazon": "Shopping",
    "netflix": "Entertainment",
    "shell": "Gas",
    "uber": "Transportation",
}

def assign_category(row):
    if pd.notnull(row.get("category")) and row["category"].strip():
        return row["category"]

    desc = row.get("description", "").lower()
    for keyword, category in CATEGORY_MAP.items():
        if keyword in desc:
            return category

    return "Uncategorized"
