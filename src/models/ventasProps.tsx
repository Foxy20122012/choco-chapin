const ventasProps = [
  {
    label: 'Monto Total',
    name: 'monto_total',
    type: 'number',
    step: 0.01 // Define el paso para los números decimales, si es aplicable
  },
  {
    label: 'Método de Pago',
    name: 'metodo_pago',
    type: 'select',
    options: [
      { value: '', label: 'Sin Información' },
      { value: 'Efectivo', label: 'Efectivo' },
      { value: 'Tarjeta', label: 'Tarjeta' }
    ],
    maxLength: 100
  },
  {
    label: 'Estado del Pedido',
    name: 'estado_pedido',
    type: 'select',
    options: [
      { value: '', label: 'Sin Información' },
      { value: 'Pendiente', label: 'Pendiente' },
      { value: 'EnProgreso', label: 'En Progreso' },
      { value: 'Completado', label: 'Completado' },
      { value: 'Incompleto', label: 'Incompleto' }
    ],
    maxLength: 50
  },
  {
    label: 'Descripción',
    name: 'descripcion',
    type: 'text',
    maxLength: 255
  },
  {
    label: 'Código',
    name: 'codigo',
    type: 'text',
    maxLength: 255
  },
  {
    label: 'Número de Cuenta',
    name: 'numero_de_cuenta',
    type: 'text',
    maxLength: 255
  },
  {
    label: 'Cantidad',
    name: 'cantidad',
    type: 'text',
    maxLength: 255
  }
]

export default ventasProps
