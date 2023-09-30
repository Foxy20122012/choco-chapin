import { MateriasPrimas as MateriasPrimasPrisma } from "@prisma/client";

export type MateriasPrimas = MateriasPrimasPrisma; // Exporta el tipo MateriasPrimas

export type Row = {
  id: number;
  nombre: string;
  cantidad_inicial: number | null;
  proveedor_id: number | null;
  fecha_recepcion: Date | null;
  codigo_unidad: string | null;
  precio_unitario: number | null;
  fecha_vencimiento: Date | null;
  ubicacion_almacen: string | null;
  descripcion: string | null;
};

export const transformMateriasPrimasToRows = (materiasPrimas: MateriasPrimas[]): Row[] => {
  
  return materiasPrimas.map((materiaPrima) => ({
    id: materiaPrima.id,
    nombre: materiaPrima.nombre || "",
    cantidad_inicial: materiaPrima.cantidad_inicial || null,
    proveedor_id: materiaPrima.proveedor_id || null,
    fecha_recepcion: materiaPrima.fecha_recepcion || new Date(0),
    codigo_unidad: materiaPrima.codigo_unidad || "",
    precio_unitario: materiaPrima.precio_unitario || null,
    fecha_vencimiento: materiaPrima.fecha_vencimiento || new Date(0),
    ubicacion_almacen: materiaPrima.ubicacion_almacen || "",
    descripcion: materiaPrima.descripcion || "",
  }));
};

export type MateriasPrimasModel = keyof Row;

export const materiasPrimasColumns: Record<MateriasPrimasModel, string> = {
  id: "ID",
  nombre: "Nombre",
  cantidad_inicial: "Cantidad Inicial",
  proveedor_id: "Proveedor ID",
  fecha_recepcion: "Fecha de Recepción",
  codigo_unidad: "Código de Unidad",
  precio_unitario: "Precio Unitario",
  fecha_vencimiento: "Fecha de Vencimiento",
  ubicacion_almacen: "Ubicación de Almacén",
  descripcion: "Descripción",
};
