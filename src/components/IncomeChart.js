import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function IncomeChart({ amounts }) {
  if (!amounts || amounts.length === 0) return null;

  // Convert amounts into chart-friendly data
  const chartData = amounts.map((amt, index) => ({
    month: `Txn ${index + 1}`,
    income: amt,
  }));

  return (
    <div style={{ marginTop: "30px", padding: "20px", border: "1px solid gray", borderRadius: "10px", background: "#fff" }}>
      <h2>📈 Income Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="income" stroke="#4CAF50" strokeWidth={3} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeChart;