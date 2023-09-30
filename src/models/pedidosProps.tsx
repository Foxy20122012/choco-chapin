const pedidosProps = [
    {
      label: "ID",
      name: "id",
      type: "number",
      readOnly: true,
    },
    {
      label: "Cliente ID",
      name: "cliente_id",
      type: "number",
    },
    {
      label: "Fecha de Pedido",
      name: "fecha_pedido",
      type: "date",
      readOnly: true,
    },
    {
      label: "Fecha de Entrega",
      name: "fecha_entrega",
      type: "date",
      readOnly: true,
    },
    {
      label: "Estado de Pedido",
      name: "estado_pedido",
      type: "text",
      maxLength: 50,
    },
    {
      label: "Detalles de Pedido",
      name: "detalles_pedido",
      type: "text",
    },
  ];
  
  export default pedidosProps;
  