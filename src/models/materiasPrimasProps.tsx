const materiasPrimasProps = [
    {
      label: "ID",
      name: "id",
      type: "number",
      readOnly: true, // El campo ID generalmente es de solo lectura
    },
    {
      label: "Nombre",
      name: "nombre",
      type: "text",
      required: true,
      maxLength: 255, // Agrega una longitud máxima
      minLength: 1, // Agrega una longitud mínima
    },
    {
      label: "Cantidad Inicial",
      name: "cantidad_inicial",
      type: "number",
      required: true,
    },
    {
      label: "Proveedor ID",
      name: "proveedor_id",
      type: "number",
    },
    {
      label: "Fecha de Recepción",
      name: "fecha_recepcion",
      type: "date", // Utiliza el tipo "date" para fechas
      // required: true,
      readOnly: true,
    },
    {
      label: "Código de Unidad",
      name: "codigo_unidad",
      type: "text",
      maxLength: 10,
    },
    {
      label: "Precio Unitario",
      name: "precio_unitario",
      type: "number",
    },
    {
      label: "Fecha de Vencimiento",
      name: "fecha_vencimiento",
      type: "date", // Utiliza el tipo "date" para fechas
      readOnly: true,
    },
    {
      label: "Ubicación de Almacén",
      name: "ubicacion_almacen",
      type: "text",
      maxLength: 100,
    },
    {
      label: "Descripción",
      name: "descripcion",
      type: "text",
    },
  ];
  
  export default materiasPrimasProps;
  