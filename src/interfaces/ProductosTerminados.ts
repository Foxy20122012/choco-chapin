import { ProductosTerminados } from "@prisma/client";

// Define un nuevo tipo 'CreateCliente' que se utiliza para crear un nuevo cliente.
// Omitimos los campos 'id' y 'fecha_registro' ya que serán generados automáticamente.
export type CreateProductosTerminados = Omit<ProductosTerminados, "id" | "fecha_produccion">;

// Define un nuevo tipo 'UpdateCliente' que se utiliza para actualizar un cliente existente.
// Es parcialmente opcional y solo se necesitan proporcionar los campos que se desean cambiar al actualizar un cliente.
// Se basa en el tipo 'CreateCliente' para que las actualizaciones sigan la misma estructura que la creación de clientes.
export type UpdateProductosTerminados = Partial<CreateProductosTerminados>;