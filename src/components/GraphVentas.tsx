import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useVentas } from "@/context/VentasContext";

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
  const { ventas } = useVentas();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Preparar los datos para la gráfica
    const labels = ventas.map((venta) => venta.fecha_venta); // Usar la fecha de venta como etiquetas
    const datasets = [
      {
        label: "Monto Total de Ventas",
        data: ventas.map((venta) => parseFloat(venta.monto_total || 0)),
        borderColor: getRandomColor(),
        fill: false,
      },
    ];

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
  }, [ventas]);

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
