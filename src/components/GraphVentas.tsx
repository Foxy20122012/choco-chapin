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
    const labels = ventas.map((venta) => formatFecha(venta.fecha_venta)); // Formatear la fecha
    const datasets = [
      {
        label: "Monto Total de Ventas",
         // @ts-ignore
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

  // Función para formatear la fecha en "dd/mm/yyyy"
  const formatFecha = (fecha) => {
    if (!fecha) return "";
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Gráfica De Ventas por fechas Historicas</h2>
      <div className="max-w-screen-md mx-auto">
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
