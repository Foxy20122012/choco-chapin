import { MateriasPrimas as MateriasPrimasPrisma } from "@prisma/client";

export type MateriasPrimas = MateriasPrimasPrisma; // Exporta el tipo MateriasPrimas

export type Row = {
  id: number;
  nombre: string;
  cantidad_inicial: number | null;
  codigo_unidad: string | null;
  precio_unitario: number | null;
  ubicacion_almacen: string | null;
  descripcion: string | null;
  cuenta: string | null;
};

export const transformMateriasPrimasToRows = (materiasPrimas: MateriasPrimas[]): Row[] => {
  // @ts-ignore
  return materiasPrimas.map((materiaPrima) => ({
    id: materiaPrima.id,
    nombre: materiaPrima.nombre || "",
    cantidad_inicial: materiaPrima.cantidad_inicial || null,
    codigo_unidad: materiaPrima.codigo_unidad || "",
    precio_unitario: materiaPrima.precio_unitario || null,
    ubicacion_almacen: materiaPrima.ubicacion_almacen || "",
    descripcion: materiaPrima.descripcion || "",
    cuenta: materiaPrima.cuenta || "",
  }));
};

export type MateriasPrimasModel = keyof Row;

export const materiasPrimasColumns: Record<MateriasPrimasModel, string> = {
  id: "ID",
  nombre: "Nombre",
  cantidad_inicial: "Cantidad Inicial",
  codigo_unidad: "Código de Unidad",
  precio_unitario: "Precio Unitario",
  ubicacion_almacen: "Ubicación de Almacén",
  descripcion: "Descripción",
  cuenta: "Cuenta",
};
