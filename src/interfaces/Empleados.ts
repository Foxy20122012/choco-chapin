import { Empleados } from "@prisma/client";

// Define un nuevo tipo 'CreateEmpleados' que se utiliza para crear un nuevo empleado.
// Omitimos el campo 'id' ya que será generado automáticamente.
export type CreateEmpleados = Omit<Empleados, "id">;

// Define un nuevo tipo 'UpdateEmpleados' que se utiliza para actualizar un empleado existente.
// Es parcialmente opcional y solo se necesitan proporcionar los campos que se desean cambiar al actualizar un empleado.
// Se basa en el tipo 'CreateEmpleados' para que las actualizaciones sigan la misma estructura que la creación de empleados.
export type UpdateEmpleados = Partial<CreateEmpleados>;