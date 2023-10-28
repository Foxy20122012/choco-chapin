import { Ventas as VentasPrisma } from "@prisma/client";

export type Ventas = VentasPrisma; // Exporta el tipo Ventas

export type Row = {
  id: number;
  monto_total: number | null;
  metodo_pago: string | null;
  estado_pedido: string | null;
  descripcion: string | null;
  codigo_materia: string | null;
  codigo: string | null;
  numero_de_cuenta: string | null;
  cantidad: string | null;
};

export const transformVentasToRows = (ventas: Ventas[] | undefined): Row[] => {
  if (!Array.isArray(ventas)) {
    // Manejar el caso en el que ventas no es un array
    return [];
  }
  // @ts-ignore
  return ventas.map((venta) => ({
    id: venta.id,
    monto_total: venta.monto_total || null,
    metodo_pago: venta.metodo_pago || null,
    estado_pedido: venta.estado_pedido || null,
    descripcion: venta.descripcion || null,
    codigo_materia: venta.codigo_materia || null,
    codigo: venta.codigo || null,
    numero_de_cuenta: venta.numero_de_cuenta || null,
    cantidad: venta.cantidad || null,
  }));
};

export type VentasModel = keyof Row;

export const ventasColumns: Record<VentasModel, string> = {
  id: "ID",
  monto_total: "Monto Total",
  metodo_pago: "Método de Pago",
  estado_pedido: "Estado del Pedido",
  descripcion: "Descripción",
  codigo_materia: "Código de Materia",
  codigo: "Código",
  numero_de_cuenta: "Número de Cuenta",
  cantidad: "Cantidad de Producto",
};
