const materiasPrimasProps = [
  {
    label: "ID",
    name: "id",
    type: "number",
    readOnly: true,
  },
  {
    label: "Nombre",
    name: "nombre",
    type: "text",
    required: true,
    maxLength: 255,
    minLength: 1,
  },
  {
    label: "Cantidad Inicial",
    name: "cantidad_inicial",
    type: "number",
    required: true,
  },
  {
    label: "Precio Unitario",
    name: "precio_unitario",
    type: "number",
  },
  {
    label: "Ubicación de Almacén",
    name: "ubicacion_almacen",
    type: "text",
    maxLength: 100,
  },
  {
    label: "cuenta",
    name: "cuenta",
    type: "text",
  },
  {
    label: "Descripción",
    name: "descripcion",
    type: "text",
  },
];

export default materiasPrimasProps;
