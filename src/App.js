import React, { useState } from "react";
import IncomeSourcePie from "./components/IncomeSourcePie";
import IncomeTrendLine from "./components/IncomeTrendLine";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [fileContent, setFileContent] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [avgTransaction, setAvgTransaction] = useState(0);
  const [irregular, setIrregular] = useState(0);
  const [incomeBySource, setIncomeBySource] = useState({});

  // Static data for income trend (extend later)
  const months = ["June", "July", "August"];
  const incomes = [15000, 23000, 24000];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);

      const lines = content.split("\n");
      let total = 0,
        count = 0;
      const sourceTotals = {};

      lines.forEach((line) => {
        const amountMatch = line.match(/\₹?(\d+)/);
        if (amountMatch) {
          const amount = parseInt(amountMatch[1]);
          total += amount;
          count++;

          const sourceMatch =
            line.match(/from (\w+)/i) || line.match(/(\w+) payout/i);
          const source = sourceMatch ? sourceMatch[1] : "Other";
          sourceTotals[source] = (sourceTotals[source] || 0) + amount;
        }
      });

      const avg = count > 0 ? total / count : 0;
      const irregularCount = lines.filter((line) => {
        const match = line.match(/\₹?(\d+)/);
        return match && parseInt(match[1]) > avg * 2;
      }).length;

      setTotalIncome(total);
      setAvgTransaction(avg);
      setIrregular(irregularCount);
      setIncomeBySource(sourceTotals);
    };

    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">💰 Smart Gig Wallet</h1>
        <ThemeToggle />
      </div>

      {/* File Upload Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h2 className="font-semibold text-xl mb-2">📂 Upload Transaction/Logs File</h2>
        <input
          type="file"
          onChange={handleFileUpload}
          className="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
      </div>

      {/* File Preview */}
      {fileContent && (
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="font-semibold text-xl mb-2">📄 File Preview</h2>
          <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded overflow-auto max-h-48">
            {fileContent}
          </pre>
        </div>
      )}

      {/* Income Analyzer */}
      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h2 className="font-semibold text-xl mb-2">📊 Income Analyzer</h2>
        <p><strong>Total Income:</strong> ₹{totalIncome}</p>
        <p><strong>Average Transaction:</strong> ₹{avgTransaction.toFixed(2)}</p>
        <p className="text-yellow-600 dark:text-yellow-400">⚠️ Irregular Transactions: {irregular}</p>
      </div>

      {/* Smart Suggestions */}
      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h2 className="font-semibold text-xl mb-2">💡 Smart Suggestions</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>💰 Save at least ₹{(totalIncome * 0.2).toFixed(0)} this month.</li>
          <li>📈 Try investing part of larger transactions into mutual funds.</li>
          <li>🕒 Your average earning is low. Plan side gigs or extra shifts.</li>
        </ul>
      </div>

      {/* Income Source Pie Chart */}
      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h2 className="font-semibold text-xl mb-2">📊 Income Sources</h2>
        <IncomeSourcePie data={incomeBySource} />
      </div>

      {/* Income Trend Line Chart */}
      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h2 className="font-semibold text-xl mb-2">📈 Income Trend</h2>
        <IncomeTrendLine months={months} incomes={incomes} />
      </div>
    </div>
  );
}

export default App;