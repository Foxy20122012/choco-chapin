import { CostosProduccion } from "@prisma/client";

// Define un nuevo tipo 'CreateCostosProduccion' que se utiliza para crear un nuevo costo de producción.
// Omitimos los campos 'id' ya que serán generados automáticamente.
export type CreateCostosProduccion = Omit<CostosProduccion, "id" | "fecha">;

// Define un nuevo tipo 'UpdateCostosProduccion' que se utiliza para actualizar un costo de producción existente.
// Es parcialmente opcional y solo se necesitan proporcionar los campos que se desean cambiar al actualizar un costo de producción.
// Se basa en el tipo 'CreateCostosProduccion' para que las actualizaciones sigan la misma estructura que la creación de costos de producción.
export type UpdateCostosProduccion = Partial<CreateCostosProduccion>;
