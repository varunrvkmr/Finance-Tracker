import React, { useState } from "react";
import axios from "axios";
import { Transaction } from "../types/Transaction";

interface Props {
  onUploadSuccess: (data: Transaction[]) => void;
}

export default function UploadForm({ onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [cardType, setCardType] = useState("visa");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a CSV file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("card_type", cardType);

    try {
      const response = await axios.post("http://localhost:8000/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUploadSuccess(response.data);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded max-w-md">
      <h2 className="text-lg font-bold mb-2">Upload CSV</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <select
        value={cardType}
        onChange={(e) => setCardType(e.target.value)}
        className="mb-2 p-1 border w-full"
      >
        <option value="visa">Visa</option>
        <option value="mastercard">MasterCard</option>
      </select>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-2 w-full"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
