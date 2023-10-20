import { CostosProduccion as CostosProduccionPrisma } from "@prisma/client";

// Exporta el tipo CostosProduccion
export type CostosProduccion = CostosProduccionPrisma;

export type Row = {
  id: number;
  nombre_producto: string | null;
  codigo: string | null;
  costo_materias_primas: string | null;
  costo_mano_de_obra: string | null;
  otros_costos: string | null;
  cantidad_producida: string | null;
  costo_total: string | null;
  codigo_producto: string | null;
};

// Función para transformar objetos CostosProduccion en el formato Row
export const transformCostosProduccionToRows = (costosProduccion: CostosProduccion[]): Row[] => {
  
  return costosProduccion.map((item) => ({
    id: item.id,
    nombre_producto: item.nombre_producto || null,
    codigo: item.codigo || null,
    costo_materias_primas: item.costo_materias_primas || null,
    costo_mano_de_obra: item.costo_mano_de_obra || null,
    otros_costos: item.otros_costos || null,
    cantidad_producida: item.cantidad_producida || null,
    costo_total: item.costo_total || null,
    codigo_producto: item.codigo_producto || null,
  }));
};

export type CostosProduccionModel = keyof Row;

// Mapeo de las columnas de CostosProduccionModel a nombres legibles
export const costosProduccionColumns: Record<CostosProduccionModel, string> = {
  id: "ID",
  nombre_producto: "Nombre del Producto",
  codigo: "Código",
  costo_materias_primas: "Costo de Materias Primas",
  costo_mano_de_obra: "Costo de Mano de Obra",
  otros_costos: "Otros Costos",
  cantidad_producida: "Cantidad Producida",
  costo_total: "Costo Total",
  codigo_producto: "Código del Producto",
};



