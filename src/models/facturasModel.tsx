import { Facturas as FacturasPrisma } from "@prisma/client";

export type Facturas = FacturasPrisma; // Exporta el tipo Facturas

export type Row = {
  id: number;
  venta_id?: number | null;
  numero_factura?: string | null;
  fecha_emision?: Date | null;
  subtotal?: number | null;
  impuestos?: number | null;
  total?: number | null;
  descripcion?: string | null;
};

export const transformFacturasToRows = (facturas: Facturas[]): Row[] => {
  // @ts-ignore
  return facturas.map((factura) => ({
    id: factura.id,
    venta_id: factura.venta_id || null,
    numero_factura: factura.numero_factura || "",
    fecha_emision: factura.fecha_emision || null,
    subtotal: factura.subtotal || null,
    impuestos: factura.impuestos || null,
    total: factura.total || null,
    descripcion: factura.descripcion || "",
  }));
};

export type FacturasModel = keyof Row;

export const facturasColumns: Record<FacturasModel, string> = {
  id: "ID",
  venta_id: "Venta ID",
  numero_factura: "Número de Factura",
  fecha_emision: "Fecha de Emisión",
  subtotal: "Subtotal",
  impuestos: "Impuestos",
  total: "Total",
  descripcion: "Descripción",
};
