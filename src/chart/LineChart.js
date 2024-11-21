import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; // Import Chart.js components

// Register the necessary components
Chart.register(...registerables);

const LineChart = () => {
  const chartRef = useRef(null);

  // Define your data for the line chart
  const data = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Monthly Data',
        data: [23, 32, 44, 45, 50, 5, 60, 65, 70, 75, 80, 100, 140],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3, // Smooth the line
        pointRadius: 5, // Adjust point size
        pointHoverRadius: 7, // Hover effect
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Hide horizontal grid lines (X-axis)
        },
      },
      y: {
        grid: {
          display: true, // Show vertical grid lines (Y-axis)
        },
      },
    },
    plugins: {
      datalabels: {
        display: false, // Disable datalabels (optional)
      },
    },
  };

  return (
    <div>
      <div className="h-[470px]  border shadow-md p-10 rounded-[10px]  w-full bg-white">
        <div className="flex justify-between relative items-center ">
          <h2 className="text-xl font-semibold">Customers</h2>
        </div>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
