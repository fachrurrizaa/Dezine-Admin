"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../../components/admin/Layout"; // Pastikan path ini benar

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions"); // Pastikan path ini benar
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched transactions:", data); // Tambahkan log untuk memeriksa data
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <Layout>
        <table className="min-w-full bg-white border-collapse table-auto">
          <thead>
            <tr className="bg-teal-100">
              <th className="px-2 py-1 text-left">Order ID</th>
              <th className="px-2 py-1 text-left">Date&Time</th>
              <th className="px-2 py-1 text-left">Transaction Type</th>
              <th className="px-2 py-1 text-left">Channel</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">Amount</th>
              <th className="px-2 py-1 text-left">Customer Email</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                className="bg-white hover:bg-gray-200"
                key={transaction._id}
              >
                <td className="border px-2 py-1">{transaction.orderId}</td>
                <td className="border px-2 py-1">{transaction.date}</td>
                <td className="border px-2 py-1">
                  {transaction.transactionType}
                </td>
                <td className="border px-2 py-1">{transaction.channel}</td>
                <td className="border px-2 py-1">{transaction.status}</td>
                <td className="border px-2 py-1">{transaction.amount}</td>
                <td className="border px-2 py-1">
                  {transaction.customerEmail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </Layout>
  );
}
