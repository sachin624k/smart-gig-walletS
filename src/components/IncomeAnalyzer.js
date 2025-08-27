import React from "react";

const IncomeAnalyzer = ({ fileData }) => {
  if (!fileData) return null;

  const transactions = fileData.split("\n").filter((line) => line.includes("₹"));
  const amounts = transactions.map((line) => {
    const match = line.match(/₹(\d+)/);
    return match ? parseInt(match[1]) : 0;
  });

  const totalIncome = amounts.reduce((a, b) => a + b, 0);
  const avgTransaction = (totalIncome / amounts.length).toFixed(2);
  const irregularTransactions = amounts.filter((a) => a > 10000).length;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold flex items-center mb-4 text-green-700">
        <span className="mr-2">📊</span> Income Analyzer
      </h2>

      <p className="text-lg">
        <strong>Total Income:</strong> ₹{totalIncome}
      </p>
      <p className="text-lg mb-4">
        <strong>Average Transaction:</strong> ₹{avgTransaction}
      </p>

      {irregularTransactions > 0 && (
        <p className="text-yellow-600 font-medium mb-2">
          ⚠️ Irregular Transactions: {irregularTransactions}
        </p>
      )}
      {totalIncome < 5000 && (
        <p className="text-red-600 font-medium">
          ⚠️ Predicted Shortfall! Consider saving more.
        </p>
      )}
    </div>
  );
};

export default IncomeAnalyzer;