import { Transaction } from "../types/Transaction";

interface Props {
  transactions: Transaction[];
}

export default function TransactionsTable({ transactions }: Props) {
  if (transactions.length === 0) {
    return <p className="text-gray-500 mt-4">No transactions uploaded yet.</p>;
  }

  return (
    <table className="w-full mt-4 border">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left p-2 border">Date</th>
          <th className="text-left p-2 border">Description</th>
          <th className="text-right p-2 border">Amount</th>
          <th className="text-left p-2 border">Category</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="p-2 border">{tx.date}</td>
            <td className="p-2 border">{tx.description}</td>
            <td className="p-2 border text-right">${tx.amount.toFixed(2)}</td>
            <td className="p-2 border">{tx.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
