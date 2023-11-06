import { Empleados as EmpleadosPrisma } from "@prisma/client";

export type Empleados = EmpleadosPrisma; // Exporta el tipo Empleados

export type Row = {
  id: number;
  nombre: string | null;
  apellido: string | null;
  direccion: string | null;
  telefono: string | null;
  correo_electronico: string | null;
  puesto: string | null;
  salario: number | null;
};

export const transformEmpleadosToRows = (empleados: Empleados[] | undefined): Row[] => {
  if (!Array.isArray(empleados)) {
    // Manejar el caso en el que empleados no es un array
    return [];
  }
  // @ts-ignore
  return empleados.map((empleado) => ({
    id: empleado.id,
    nombre: empleado.nombre || null,
    apellido: empleado.apellido || null,
    direccion: empleado.direccion || null,
    telefono: empleado.telefono || null,
    correo_electronico: empleado.correo_electronico || null,
    puesto: empleado.puesto || null,
    salario: empleado.salario || null,
  }));
};

export type EmpleadosModel = keyof Row;

export const empleadosColumns: Record<EmpleadosModel, string> = {
  id: "ID",
  nombre: "Nombre",
  apellido: "Apellido",
  direccion: "Dirección",
  telefono: "Teléfono",
  correo_electronico: "Correo Electrónico",
  puesto: "Puesto",
  salario: "Salario",
};