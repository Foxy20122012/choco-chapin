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

const LineChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Supongamos que tienes un array de objetos con datos, donde cada objeto tiene propiedades "label" y "data".
    // Esto puede variar según tus datos reales.
    const dataFromDatabase = [
      { label: "Enero", data: [10, 20, 15, 30] },
      { label: "Febrero", data: [15, 25, 20, 35] },
      // Agrega más meses o datos según sea necesario
    ];

    // Preparar los datos para la gráfica
    const labels = dataFromDatabase[0]?.data.map((_, index) => `Día ${index + 1}`);
    const datasets = dataFromDatabase.map((item) => ({
      label: item.label,
      data: item.data,
      borderColor: getRandomColor(),
      fill: false,
    }));

    // Configuración de opciones de la gráfica (puedes personalizarlas)
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Configuración de la gráfica
    const chartConfig = {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: options,
    };

    // Configura los datos para el gráfico
    setChartData(chartConfig);
  }, []);


  return (
    <div>
      <h2>Gráfica de Líneas</h2>
      <div style={{ maxWidth: "800px" }}>
        {chartData && <Line data={chartData.data} options={chartData.options} />}
      </div>
    </div>
  );
};

// Función para generar colores aleatorios
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default LineChart;
