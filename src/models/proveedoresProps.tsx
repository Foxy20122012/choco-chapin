const proveedoresProps = [
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
      maxLength: 255, // Puedes utilizar la longitud máxima definida en el modelo Prisma
    },
    {
      label: "Dirección",
      name: "direccion",
      type: "text",
      required: true,
      maxLength: 255,
    },
    {
      label: "Teléfono",
      name: "telefono",
      type: "tel",
      required: true,
      maxLength: 15,
    },
    {
      label: "Correo Electrónico",
      name: "correo_electronico",
      type: "email",
      required: true,
      maxLength: 100,
    },
    {
      label: "Sitio Web",
      name: "sitio_web",
      type: "text",
      required: false, // El campo sitio_web es opcional según el modelo Prisma
      maxLength: 255,
    },
  ];
  
  export default proveedoresProps;
  