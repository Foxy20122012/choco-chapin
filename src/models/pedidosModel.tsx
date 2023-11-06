import { Pedidos as PedidosPrisma } from "@prisma/client";

export type Pedidos = PedidosPrisma;

export type Row = {
  id: number;
  estado_pedido: string | null;
  codigo_pedido: string | null;
  tipo_pago: string | null;
  direccion_envio: string | null;
  codigo_venta: string | null;
};

export const transformPedidosToRows = (pedidos: Pedidos[]): Row[] => {
  return pedidos.map((pedido) => ({
    id: pedido.id,
    estado_pedido: pedido.estado_pedido || "",
    codigo_pedido: pedido.codigo_pedido || "",
    tipo_pago: pedido.tipo_pago || "",
    direccion_envio: pedido.direccion_envio || "",
    codigo_venta: pedido.codigo_venta || "",
  }));
};

export type PedidosModel = keyof Row;

export const pedidosColumns: Record<PedidosModel, string> = {
  id: "ID",
  estado_pedido: "Estado de Pedido",
  codigo_pedido: "Código de Pedido",
  tipo_pago: "Tipo de Pago",
  direccion_envio: "Dirección de Envío",
  codigo_venta: "Código de Venta",
};