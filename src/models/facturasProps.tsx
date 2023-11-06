const facturasProps = [
    {
      label: "ID",
      name: "id",
      type: "number",
      readOnly: true,
    },
    {
      label: "Venta ID",
      name: "venta_id",
      type: "number",
      readOnly: true,
    },
    {
      label: "Número de Factura",
      name: "numero_factura",
      type: "text",
      maxLength: 20,
    },
    {
      label: "Fecha de Emisión",
      name: "fecha_emision",
      type: "date",
      readOnly: true,
    },
    {
      label: "Subtotal",
      name: "subtotal",
      type: "number",
      maxLength: 10,
      decimalPlaces: 2,
    },
    {
      label: "Impuestos",
      name: "impuestos",
      type: "number",
      maxLength: 10,
      decimalPlaces: 2,
    },
    {
      label: "Total",
      name: "total",
      type: "number",
      maxLength: 10,
      decimalPlaces: 2,
    },
    {
      label: "Descripción",
      name: "descripcion",
      type: "text",
    },
  ];
  
  export default facturasProps;
  