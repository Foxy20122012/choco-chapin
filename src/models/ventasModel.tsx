import { Ventas as VentasPrisma } from "@prisma/client";

export type Ventas = VentasPrisma; // Exporta el tipo Ventas

export type Row = {
  id: number;
  // cliente_id: number | null;
  monto_total: number | null;
  metodo_pago: string | null;
  estado_pedido: string | null;
  descripcion: string | null;
  codigo_materia: string | null; // Añadido el campo "codigo_materia"
};

export const transformVentasToRows = (ventas: Ventas[] | undefined): Row[] => {
  if (!Array.isArray(ventas)) {
    // Manejar el caso en el que ventas no es un array
    return [];
  }
  // @ts-ignore
  return ventas.map((venta) => ({
    id: venta.id,
    // cliente_id: venta.cliente_id || null,
    monto_total: venta.monto_total || null,
    metodo_pago: venta.metodo_pago || null,
    estado_pedido: venta.estado_pedido || null,
    descripcion: venta.descripcion || null,
    codigo_materia: venta.codigo_materia || null,
  }));
};


export type VentasModel = keyof Row;

export const ventasColumns: Record<VentasModel, string> = {
  id: "ID",
  // cliente_id: "Cliente ID",
  monto_total: "Monto Total",
  metodo_pago: "Método de Pago",
  estado_pedido: "Estado del Pedido",
  descripcion: "Descripción",
  codigo_materia: "Código de Materia",
};

