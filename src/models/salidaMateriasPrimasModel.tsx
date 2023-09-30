import { SalidasMateriasPrimas as SalidasMateriasPrimasPrisma } from "@prisma/client";

// Define el tipo SalidasMateriasPrimas usando el modelo de Prisma
export type SalidasMateriasPrimas = SalidasMateriasPrimasPrisma;

// Define el tipo Row para representar las filas de la tabla de SalidasMateriasPrimas
export type SalidasMateriasPrimasRow = {
  id: number;
//   materia_prima_id: number | null;
  cantidad: number | null;
  fecha_salida: Date | null;
  destino: string | null;
  responsable_salida: string | null;
  descripcion: string | null;
};

// Función para transformar un array de SalidasMateriasPrimas en un array de SalidasMateriasPrimasRow
export const transformSalidasMateriasPrimasToRows = (
  salidasMateriasPrimas: SalidasMateriasPrimas[]
): SalidasMateriasPrimasRow[] => {
  return salidasMateriasPrimas.map((salida) => ({
    id: salida.id,
    // materia_prima_id: salida.materia_prima_id || null,
    cantidad: salida.cantidad || null,
    fecha_salida: salida.fecha_salida ? new Date(salida.fecha_salida) : null,
    destino: salida.destino || null,
    responsable_salida: salida.responsable_salida || null,
    descripcion: salida.descripcion || null,
  }));
};

// Define los campos disponibles en el modelo de SalidasMateriasPrimas
export type SalidasMateriasPrimasModel = keyof SalidasMateriasPrimasRow;

// Mapea los campos a nombres de columnas para mostrar en la interfaz de usuario
export const salidasMateriasPrimasColumns: Record<SalidasMateriasPrimasModel, string> = {
  id: "ID",
//   materia_prima_id: "Materia Prima ID",
  cantidad: "Cantidad",
  fecha_salida: "Fecha de Salida",
  destino: "Destino",
  responsable_salida: "Responsable de Salida",
  descripcion: "Descripción",
};
