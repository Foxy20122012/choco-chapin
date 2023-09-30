import { Ventas as VentasPrisma } from "@prisma/client";

// Define el tipo Ventas usando el modelo de Prisma
export type Ventas = VentasPrisma;

// Define el tipo Row para representar las filas de la tabla de Ventas
export type VentasRow = {
  id: number;
  monto_total: number | null;
  fecha_venta: Date | null;
  metodo_pago: string | null;
  estado_pedido: string | null;
  descripcion: string | null;
};

// Función para transformar un array de Ventas en un array de VentasRow
export const transformVentasToRows = (ventas: Ventas[]): VentasRow[] => {
  return ventas.map((venta) => ({
    id: venta.id,
    monto_total: venta.monto_total || null,
    fecha_venta: venta.fecha_venta ? new Date(venta.fecha_venta) : null,
    metodo_pago: venta.metodo_pago || "",
    estado_pedido: venta.estado_pedido || "",
    descripcion: venta.descripcion || "",
  }));
};

// Define los campos disponibles en el modelo de Ventas
export type VentasModel = keyof VentasRow;

// Mapea los campos a nombres de columnas para mostrar en la interfaz de usuario
export const ventasColumns: Record<VentasModel, string> = {
  id: "ID",
  monto_total: "Monto Total",
  fecha_venta: "Fecha de Venta",
  metodo_pago: "Método de Pago",
  estado_pedido: "Estado del Pedido",
  descripcion: "Descripción",
};
