// src/components/IncomeTrendLine.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function IncomeTrendLine({ months, incomes }) {
  const chartData = {
    labels: months,
    datasets: [{
      label: 'Income Over Time',
      data: incomes,
      borderColor: 'rgb(75, 192, 192)',
      fill: false,
      tension: 0.1,
    }]
  };

  return <Line data={chartData} />;
}

export default IncomeTrendLine;