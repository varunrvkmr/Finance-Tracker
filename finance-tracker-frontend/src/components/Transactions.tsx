import React from "react";
import { Transaction } from "../types/Transaction";

interface Props {
  transactions: Transaction[];
}

export default function Transactions({ transactions }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Transactions</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td className="p-2 border">{tx.date}</td>
              <td className="p-2 border">{tx.description}</td>
              <td className="p-2 border">${tx.amount.toFixed(2)}</td>
              <td className="p-2 border">{tx.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
