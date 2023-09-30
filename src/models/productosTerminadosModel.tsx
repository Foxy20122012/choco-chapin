import { ProductosTerminados as ProductosTerminadosPrisma } from "@prisma/client";

export type ProductosTerminados = ProductosTerminadosPrisma;

export type Row = {
  id: number;
  nombre?: string;
  tipo_dulce?: string;
  cantidad_producida?: number;
  fecha_produccion?: Date;
  precio_venta?: number;
  descripcion?: string;
};

export const transformProductosTerminadosToRows = (
  productosTerminados: ProductosTerminados[]
): Row[] => {
  return productosTerminados.map((producto) => ({
    id: producto.id,
    nombre: producto.nombre || "",
    tipo_dulce: producto.tipo_dulce || "",
    cantidad_producida: producto.cantidad_producida || 0,
    fecha_produccion: producto.fecha_produccion || new Date(0),
    precio_venta:producto.precio_venta || null,
    descripcion: producto.descripcion || "",
  }));
};

export type ProductosTerminadosModel = keyof Row;

export const productosTerminadosColumns: Record<
  ProductosTerminadosModel,
  string
> = {
  id: "ID",
  nombre: "Nombre",
  tipo_dulce: "Tipo de Dulce",
  cantidad_producida: "Cantidad Producida",
  fecha_produccion: "Fecha de Producción",
  precio_venta: "Precio de Venta",
  descripcion: "Descripción",
};
