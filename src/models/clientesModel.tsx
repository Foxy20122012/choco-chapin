import { Clientes as ClientesPrisma } from "@prisma/client";

export type Clientes = ClientesPrisma; // Exporta el tipo Clientes

export type Row = {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  correo_electronico: string;
  fecha_registro: Date;
  historial_compras: string;
};

export const transformClientesToRows = (clientes: Clientes[]): Row[] => {
  return clientes.map((cliente) => ({
    id: cliente.id,
    nombre: cliente.nombre || "", // Asegúrate de proporcionar un valor predeterminado en caso de ser null
    direccion: cliente.direccion || "",
    telefono: cliente.telefono || "",
    correo_electronico: cliente.correo_electronico || "",
    fecha_registro: cliente.fecha_registro || new Date(0), // Fecha predeterminada en caso de ser null
    historial_compras: cliente.historial_compras || "",
  }));
};

export type ClientesModel = keyof Row;

export const clientesColumns: Record<ClientesModel, string> = {
  id: "ID",
  nombre: "Nombre",
  direccion: "Dirección",
  telefono: "Teléfono",
  correo_electronico: "Correo Electrónico",
  fecha_registro: "Fecha de Registro",
  historial_compras: "Historial de Compras",
};
