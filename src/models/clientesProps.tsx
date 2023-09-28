const clientesProps = [
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
  },
  {
    label: "Dirección",
    name: "direccion",
    type: "text",
    required: true,
  },
  {
    label: "Teléfono",
    name: "telefono",
    type: "tel", // Utiliza el tipo "tel" para números de teléfono
    required: true,
  },
  {
    label: "Correo Electrónico",
    name: "correo_electronico",
    type: "email", // Utiliza el tipo "email" para direcciones de correo electrónico
    required: true,
  },
  {
    label: "Fecha de Registro",
    name: "fecha_registro",
    type: "date", // Utiliza el tipo "date" para fechas
    // required: true,
    readOnly: true, 
  },
  {
    label: "Historial de Compras",
    name: "historial_compras",
    type: "text",
    required: true,
  },
];

export default clientesProps;
