import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import TransactionsTable from "../components/TransactionsTable";
import { Transaction } from "../types/Transaction";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleUploadSuccess = (uploadedData: Transaction[]) => {
    setTransactions(uploadedData);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Finance Tracker Dashboard</h1>

      <UploadForm onUploadSuccess={handleUploadSuccess} />

      <div className="mt-8">
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
}
