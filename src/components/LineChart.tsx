import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip
);

const LineChart = ({ data, xLabel, yLabel }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data && data.labels && data.datasets) {
      const chartConfig = {
        type: "line",
        data: {
          labels: data.labels,
          datasets: data.datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: yLabel || "",
              },
            },
            x: {
              title: {
                display: true,
                text: xLabel || "",
              },
            },
          },
        },
      };

      setChartData(chartConfig);
    }
  }, [data, xLabel, yLabel]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Gráfico</h2>
      <div className="max-w-screen-md mx-auto">
        {chartData && <Line data={chartData.data} options={chartData.options} />}
      </div>
    </div>
  );
};

export default LineChart;
