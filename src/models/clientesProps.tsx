// clientesProps.tsx
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
      type: "tel",
    },
    {
      label: "Correo Electrónico",
      name: "correo_electronico",
      type: "email",
    },
    {
      label: "Fecha de Registro",
      name: "fecha_registro",
      type: "date",
    },
    {
      label: "Historial de Compras",
      name: "historial_compras",
      type: "textarea",
    },
  ];
  
  export default clientesProps;
  