const productosTerminadosProps = [
  {
    label: "Nombre",
    name: "nombre",
    type: "text",
    maxLength: 255,
  },
  {
    label: "Tipo de Dulce",
    name: "tipo_dulce",
    type: "text",
    maxLength: 100,
  },
  {
    label: "Cantidad Producida",
    name: "cantidad_producida",
    type: "number",
  },
  {
    label: "Fecha de Producción",
    name: "fecha_produccion",
    type: "date",
    readOnly: true,
  },
  {
    label: "Precio de Venta",
    name: "precio_venta",
    type: "number",
  },
  {
    label: "Descripción",
    name: "descripcion",
    type: "text",
  },
];

export default productosTerminadosProps;
