const empleadosProps = [
    {
      label: "Nombre",
      name: "nombre",
      type: "text",
      maxLength: 255,
    },
    {
      label: "Apellido",
      name: "apellido",
      type: "text",
      maxLength: 255,
    },
    {
      label: "Dirección",
      name: "direccion",
      type: "text",
      maxLength: 255,
    },
    {
      label: "Teléfono",
      name: "telefono",
      type: "text",
      maxLength: 15,
    },
    {
      label: "Correo Electrónico",
      name: "correo_electronico",
      type: "email",
      maxLength: 100,
    },
    {
      label: "Puesto",
      name: "puesto",
      type: "text",
      maxLength: 255,
    },
    {
      label: "Salario",
      name: "salario",
      type: "number",
      step: 0.01, // Define el paso para los números decimales, si es aplicable
    },
  ];
  
  export default empleadosProps;
  