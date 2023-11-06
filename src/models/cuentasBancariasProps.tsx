const cuentasBancariasProps = [
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
      maxLength: 50, // Agrega una longitud máxima
      minLength: 3, // Agrega una longitud mínima
    },
    {
      label: "Número de Cuenta",
      name: "numero_cuenta",
      type: "text",
      required: true,
    },
    {
      label: "Banco",
      name: "banco",
      type: "text",
      required: true,
    },
    {
      label: "Saldo Actual",
      name: "saldo_actual",
      type: "number", // Utiliza el tipo "number" para valores de saldo
      required: true,
      step: 0.01, // Define el incremento mínimo
    },
  ];
  
  export default cuentasBancariasProps;
  