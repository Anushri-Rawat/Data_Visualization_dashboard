import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import randomColor from "randomcolor";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title || "",
      },
    },
  };

  var colors =
    data &&
    randomColor({
      count: Object.keys(data).length,
      uminosity: "dark",
      hue: "blue",
    });

  const datas = {
    labels: data ? Object.keys(data) : [],
    datasets: [
      {
        label: title || "",
        data: data ? Object.values(data) : [],
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 3,
      },
    ],
  };

  return (
    <>
      <Line data={datas} options={options} />
    </>
  );
};

export default LineChart;
