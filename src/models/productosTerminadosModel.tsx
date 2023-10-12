import { ProductosTerminados as ProductosTerminadosPrisma } from "@prisma/client";

// Define el modelo ProductosTerminados
export type ProductosTerminados = ProductosTerminadosPrisma;

// Define una fila (row) para los datos de ProductosTerminados
export type Row = {
  id: number;
  nombre?: string;
  tipo_dulce?: string;
  cantidad_producida?: number;
  fecha_produccion?: Date;
  precio_venta?: number;
  descripcion?: string;
};

// Función para transformar ProductosTerminados a filas (rows)
export const transformProductosTerminadosToRows = (
  productosTerminados: ProductosTerminados[]
): Row[] => {
  //@ts-ignore
  return productosTerminados.map((producto) => ({
    id: producto.id,
    nombre: producto.nombre || "",
    tipo_dulce: producto.tipo_dulce || "",
    cantidad_producida: producto.cantidad_producida || 0,
    fecha_produccion: producto.fecha_produccion || new Date(0),
    precio_venta: producto.precio_venta || 0,
    descripcion: producto.descripcion || "",
  }));
};

// Define las columnas del modelo
export type ProductosTerminadosModel = keyof Row;

// Mapea las columnas a nombres legibles
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
