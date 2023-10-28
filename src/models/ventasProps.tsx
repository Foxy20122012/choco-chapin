const ventasProps = [
  {
    label: "ID",
    name: "id",
    type: "number",
    readOnly: true,
  },
  {
    label: "Monto Total",
    name: "monto_total",
    type: "number",
    step: 0.01, // Define el paso para los números decimales, si es aplicable
  },
  {
    label: "Método de Pago",
    name: "metodo_pago",
    type: "select",
    options: [
      { value: "Sin Informacion", label: "  " }, 
      { value: "Efectivo", label: "Efectivo" },
      { value: "Tarjeta", label: "Tarjeta" },
    ],
    maxLength: 100,
  },
  {
    label: "Estado de la Venta",
    name: "estado_pedido",
    type: "select",
    options: [
      { value: "Sin Informacion", label: "  " }, 
      { value: "Pendiente", label: "Pendiente" },
      { value: "EnProgreso", label: "En Progreso" },
      { value: "Completado", label: "Completado" },
      { value: "Incompleto", label: "Incompleto" },
    ],
    maxLength: 50,
  },
  {
    label: "Descripción",
    name: "descripcion",
    type: "select", // Debes ajustar esto a "text" si se trata de un campo de texto
    options: [
      { value: "SinInformacion", label: "Sin Información" },
      { value: "VentaMayoreo", label: "Venta al Mayoreo"  },
      { value: "VentaSimple", label: "Venta Simple" },
      { value: "PrestacionServicios", label: "Prestación de Servicios" },
      { value: "VentaMateriales", label: "Venta de Materiales" },
      { value: "AlquilerServicios", label: "Alquiler de Servicios" },
      { value: "OtraTransaccion", label: "Otra Transacción" },
    ],
  },
  {
    label: "Código de Materia",
    name: "codigo_materia",
    type: "text",
    maxLength: 255,
  },
];

export default ventasProps;

