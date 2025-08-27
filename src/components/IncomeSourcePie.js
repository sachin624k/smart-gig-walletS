import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function IncomeSourcePie({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: ['#3498db', '#e74c3c', '#f1c40f', '#2ecc71'],
      borderWidth: 1,
    }]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <Doughnut
        data={chartData}
        options={options}
      />
    </div>
  );
}

export default IncomeSourcePie;