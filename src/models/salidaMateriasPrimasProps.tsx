const salidasMateriasPrimasProps = [
  {
    label: "ID",
    name: "id",
    type: "number",
    readOnly: true,
  },
  {
    label: "Código de Materia Prima", // Agregado el campo código de materia prima
    name: "codigo_materia_prima", // Nombre del campo
    type: "text", // Tipo de campo
    maxLength: 255, // Máxima longitud permitida
  },
  {
    label: "Cantidad",
    name: "cantidad",
    type: "number",
    step: 0.01,
  },
  {
    label: "Destino",
    name: "destino",
    type: "text",
    maxLength: 100,
  },
  {
    label: "Responsable de Salida",
    name: "responsable_salida",
    type: "text",
    maxLength: 255,
  },
  {
    label: "Descripción",
    name: "descripcion",
    type: "textarea",
  },
];

export default salidasMateriasPrimasProps;
