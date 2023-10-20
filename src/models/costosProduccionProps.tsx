const costosProduccionProps = [

  {
    label: "Costo de Materias Primas",
    name: "costo_materias_primas",
    type: "text", // Cambiado a tipo "text" en lugar de "number"
    required: false,
    maxLength: 255, // Máximo número de caracteres
  },
  {
    label: "Costo de Mano de Obra",
    name: "costo_mano_de_obra",
    type: "text", // Cambiado a tipo "text" en lugar de "number"
    required: false,
    maxLength: 255,
  },
  {
    label: "Otros Costos",
    name: "otros_costos",
    type: "text", // Cambiado a tipo "text" en lugar de "number"
    required: false,
    maxLength: 255,
  },
];

export default costosProduccionProps;
