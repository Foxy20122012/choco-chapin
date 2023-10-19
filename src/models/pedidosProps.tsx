const pedidosProps = [
  {
    label: "ID",
    name: "id",
    type: "number",
    readOnly: true,
  },
  {
    label: "Estado de Pedido", 
    name: "estado_pedido",
    type: "select",
    options: [
      { value: "SinInformacion", label: "Sin Información" }, 
      { value: "Pendiente", label: "Pendiente" },
      { value: "EnProgreso", label: "En Progreso" },
      { value: "Completado", label: "Completado" },
      { value: "Incompleto", label: "Incompleto" },
    ],
  },
  {
    label: "Código de Pedido",
    name: "codigo_pedido",
    type: "text",
  },
  {
    label: "Tipo de Pago",
    name: "tipo_pago",
    type: "select",
    options: [
      { value: "Sin Informacion", label: "  " }, 
      { value: "Efectivo", label: "Efectivo" },
      { value: "Tarjeta", label: "Tarjeta" },
    ],
  },
  {
    label: "Dirección de Envío",
    name: "direccion_envio",
    type: "text",
  },
  {
    label: "Código de Venta",
    name: "codigo_venta",
    type: "text",
  },
];

export default pedidosProps;