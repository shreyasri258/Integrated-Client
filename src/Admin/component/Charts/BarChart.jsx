import PropTypes from "prop-types";
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
        backgroundColor: ["rgb(163, 204, 250)"],
        borderColor: "rgb(13, 71, 161)",
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
          fontSize: 10, // Adjust the font size as needed
        },
      },
    },
  };

  ChartJS.defaults.font.size = 10;
  return (
    
      <Bar data={chartData} options={options} />
   
  );
}

BarChart.propTypes = {
  answersFreq: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartLabel: PropTypes.string.isRequired,
};

export default BarChart;
