const salidasMateriasPrimasProps = [
    {
      label: "ID",
      name: "id",
      type: "number",
      readOnly: true,
    },
    // {
    //   label: "Materia Prima ID",
    //   name: "materia_prima_id",
    //   type: "number",
    //   readOnly: true,
    // },
    {
      label: "Cantidad",
      name: "cantidad",
      type: "number",
      step: 0.01, // Define el paso para los números decimales, si es aplicable
    },
    {
      label: "Fecha de Salida",
      name: "fecha_salida",
      type: "date",
      readOnly: true,
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
      type: "textarea", // Utiliza "textarea" para campos de texto largos
    },
  ];
  
  export default salidasMateriasPrimasProps;
  