import { ProductosTerminados } from "@prisma/client";

export type CreateProductosTerminados = Omit<ProductosTerminados, "id" | "fecha_produccion" | "tipo_dulce">;

export type UpdateProductosTerminados = Partial<CreateProductosTerminados>;
