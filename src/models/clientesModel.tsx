import { Clientes } from "@prisma/client";


export type ClientesModel = {
    id: keyof Clientes;
    nombre: keyof Clientes;
    direccion: keyof Clientes;
    telefono: keyof Clientes;
    correo_electronico: keyof Clientes;
    fecha_registro: keyof Clientes;
    historial_compras: keyof Clientes;
  };
  
  export const clientesColumns: Record<keyof Clientes, string> = {
    id: "ID",
    nombre: "Nombre",
    direccion: "Dirección",
    telefono: "Teléfono",
    correo_electronico: "Correo Electrónico",
    fecha_registro: "Fecha de Registro",
    historial_compras: "Historial de Compras",
  };
  