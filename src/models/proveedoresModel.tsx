import { Proveedores as ProveedoresPrisma } from "@prisma/client";

// Define el tipo Proveedores usando el modelo de Prisma
export type Proveedores = ProveedoresPrisma;

// Define el tipo Row para representar las filas de la tabla de Proveedores
export type ProveedoresRow = {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  correo_electronico: string;
  sitio_web: string;
};

// Función para transformar un array de Proveedores en un array de ProveedoresRow
export const transformProveedoresToRows = (proveedores: Proveedores[]): ProveedoresRow[] => {
  return proveedores.map((proveedor) => ({
    id: proveedor.id,
    nombre: proveedor.nombre || "",
    direccion: proveedor.direccion || "",
    telefono: proveedor.telefono || "",
    correo_electronico: proveedor.correo_electronico || "",
    sitio_web: proveedor.sitio_web || "",
  }));
};

// Define los campos disponibles en el modelo de Proveedores
export type ProveedoresModel = keyof ProveedoresRow;

// Mapea los campos a nombres de columnas para mostrar en la interfaz de usuario
export const proveedoresColumns: Record<ProveedoresModel, string> = {
  id: "ID",
  nombre: "Nombre",
  direccion: "Dirección",
  telefono: "Teléfono",
  correo_electronico: "Correo Electrónico",
  sitio_web: "Sitio Web",
};
