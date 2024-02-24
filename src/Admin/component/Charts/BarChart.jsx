import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ answersFreq, labels, chartLabel }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: answersFreq,
        backgroundColor: ["rgba(153, 102, 255, 0.2)"],
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 2,
        weight: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          fontSize: 11, // Adjust the font size as needed
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          fontSize: 30, // Adjust the font size as needed
        },
      },
    },
  };

  ChartJS.defaults.font.size = 20;
  return <Bar data={chartData} options={options} />;
}

export default BarChart;
