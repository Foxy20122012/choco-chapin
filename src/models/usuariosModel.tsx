import { Usuarios as UsuariosPrisma } from "@prisma/client";

export type Usuarios = UsuariosPrisma // Exporta el tipo Clientes

export type Row = {
  id: number;
  nombre_usuario : string;
  contrasena : string;
  nombre_completo: string;
  correo_electronico: string;

};

export const transformUsuariosToRows = (usuarios: Usuarios[]): Row[] => {
    // @ts-ignore
  return usuarios.map((usuarios) => ({
    id: usuarios.id,
    nombre: usuarios.nombre_usuario  || "", // Proporciona un valor predeterminado en caso de ser null
    direccion: usuarios.contrasena  || "",
    telefono: usuarios.nombre_completo || "",
    correo_electronico: usuarios.correo_electronico || "",

  }));
};

export type ClientesModel = keyof Row;

export const usuariosColumns: Record<ClientesModel, string> = {
  id: "ID",
  nombre_usuario : "Nombre  Usuario ",
  contrasena : "contrasena ",
  nombre_completo: "nombre_completo",
  correo_electronico: "Correo Electrónico",

};
