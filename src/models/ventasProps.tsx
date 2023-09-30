const ventasProps = [
    {
      label: "ID",
      name: "id",
      type: "number",
      readOnly: true,
    },
    {
      label: "Monto Total",
      name: "monto_total",
      type: "number",
      step: 0.01, // Define el paso para los números decimales, si es aplicable
    },
    {
      label: "Fecha de Venta",
      name: "fecha_venta",
      type: "date",
      readonly: true,
    },
    {
      label: "Método de Pago",
      name: "metodo_pago",
      type: "text",
      maxLength: 100,
    },
    {
      label: "Estado del Pedido",
      name: "estado_pedido",
      type: "text",
      maxLength: 50,
    },
    {
      label: "Descripción",
      name: "descripcion",
      type: "textarea", // Utiliza "textarea" para campos de texto largos
    },
  ];
  
  export default ventasProps;
  