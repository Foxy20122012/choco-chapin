import React from 'react'
import LineChart from '@/components/LineChart'

const SalesLineChart = ({ ventasData }) => {
  return (
    <LineChart
      data={{
        labels: ventasData.map((venta) => {
          const fechaVenta = new Date(venta.fecha)
          return fechaVenta.toLocaleDateString()
        }),
        datasets: [
          {
            label: 'Monto Total de Ventas',
            data: ventasData.map((venta) => venta.montoTotal),
            borderColor: '#3e95cd',
            fill: false
          }
        ]
      }}
      xLabel="Fecha de Venta"
      yLabel="Monto Total"
    />
  )
}

export default SalesLineChart
