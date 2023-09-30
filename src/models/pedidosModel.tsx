import { Pedidos as PedidosPrisma } from "@prisma/client";

export type Pedidos = PedidosPrisma; // Exporta el tipo Pedidos

export type Row = {
  id: number;
  cliente_id: number | null;
  fecha_pedido: Date | null;
  fecha_entrega: Date | null;
  estado_pedido: string | null;
  detalles_pedido: string | null;
};

export const transformPedidosToRows = (pedidos: Pedidos[]): Row[] => {
  return pedidos.map((pedido) => ({
    id: pedido.id,
    cliente_id: pedido.cliente_id || null, // Asegúrate de proporcionar un valor predeterminado en caso de ser null
    fecha_pedido: pedido.fecha_pedido || null,
    fecha_entrega: pedido.fecha_entrega || null,
    estado_pedido: pedido.estado_pedido || "",
    detalles_pedido: pedido.detalles_pedido || "",
  }));
};

export type PedidosModel = keyof Row;

export const pedidosColumns: Record<PedidosModel, string> = {
  id: "ID",
  cliente_id: "Cliente ID",
  fecha_pedido: "Fecha de Pedido",
  fecha_entrega: "Fecha de Entrega",
  estado_pedido: "Estado de Pedido",
  detalles_pedido: "Detalles de Pedido",
};
