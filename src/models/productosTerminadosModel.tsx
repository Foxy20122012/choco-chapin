import { ProductosTerminados as ProductosTerminadosPrisma } from "@prisma/client";

// Define el modelo ProductosTerminados
export type ProductosTerminados = ProductosTerminadosPrisma;

// Define una fila (row) para los datos de ProductosTerminados
export type Row = {
  id: number;
  nombre?: string | null;
  tipo_dulce?: string | null;
  cantidad_producida?: string | null; // Cambiado a string
  fecha_produccion?: Date | null;
  precio_venta?: string | null; // Cambiado a string
  descripcion?: string | null;
};

// Función para transformar ProductosTerminados a filas (rows)
export const transformProductosTerminadosToRows = (
  productosTerminados: ProductosTerminados[]
): Row[] => {
  return productosTerminados.map((producto) => ({
    id: producto.id,
    nombre: producto.nombre || null,
    tipo_dulce: producto.tipo_dulce || null,
    cantidad_producida: producto.cantidad_producida || null,
    fecha_produccion: producto.fecha_produccion || null,
    precio_venta: producto.precio_venta || null,
    descripcion: producto.descripcion || null,
  }));
};

// Define las columnas del modelo
export type ProductosTerminadosModel = keyof Row;

// Mapea las columnas a nombres legibles
export const productosTerminadosColumns: Record<ProductosTerminadosModel, string> = {
  id: "ID",
  nombre: "Nombre",
  tipo_dulce: "Tipo de Dulce",
  cantidad_producida: "Cantidad Producida",
  fecha_produccion: "Fecha de Producción",
  precio_venta: "Precio de Venta",
  descripcion: "Descripción",
};

