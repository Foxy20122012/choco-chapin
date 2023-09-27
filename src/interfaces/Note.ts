// Importa el tipo 'Note' de Prisma, que representa una entidad de nota en la base de datos.
import { Note } from "@prisma/client";

// Define un nuevo tipo 'CreateNote' que se utiliza para crear una nueva nota.
// Omitimos los campos 'id', 'createdAt', y 'updatedAt' de la entidad 'Note' para crear una nueva nota.
export type CreateNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

// Define un nuevo tipo 'UpdateNote' que se utiliza para actualizar una nota existente.
// Es parcialmente opcional y solo se necesitan proporcionar los campos que se desean cambiar al actualizar una nota.
// Se basa en el tipo 'CreateNote' para que las actualizaciones sigan la misma estructura que la creación de notas.
export type UpdateNote = Partial<CreateNote>;
