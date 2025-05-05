import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import Transactions from "./components/Transactions";
import { Transaction } from "./types/Transaction";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  return (
    <div className="p-8">
      <UploadForm onUploadSuccess={setTransactions} />
      <div className="mt-6">
        <Transactions transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
