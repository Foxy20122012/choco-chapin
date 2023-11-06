import { createContext, useState, useContext } from "react";
import { CreateEmpleados, UpdateEmpleados } from "@/interfaces/Empleados"; // Importa los tipos para Empleados
import { Empleados } from "@prisma/client"; // Importa el tipo Cliente

export const EmpleadosContext = createContext<{
  empleados: Empleados[];
  loadEmpleados: () => Promise<void>;
  createEmpleado: (empleado: CreateEmpleados) => Promise<void>;
  deleteEmpleado: (id: number) => Promise<void>;
  selectedEmpleado: Empleados | null;
  setSelectedEmpleado: (empleado: Empleados | null) => void;
  updateEmpleado: (id: number, empleado: UpdateEmpleados) => Promise<void>;
}>({
  empleados: [],
  loadEmpleados: async () => {},
  createEmpleado: async (empleado: CreateEmpleados) => {},
  deleteEmpleado: async (id: number) => {},
  selectedEmpleado: null,
  setSelectedEmpleado: (empleado: Empleados | null) => {},
  updateEmpleado: async (id: number, empleado: UpdateEmpleados) => {},
});

export const useEmpleados = () => {
  const context = useContext(EmpleadosContext);
  if (!context) {
    throw new Error("useEmpleados must be used within an EmpleadosProvider");
  }
  return context;
};

export const EmpleadosProvider = ({ children }: { children: React.ReactNode }) => {
  const [empleados, setEmpleados] = useState<Empleados[]>([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleados | null>(null);

  async function loadEmpleados() {
    // Aquí debes implementar la lógica para cargar empleados desde tu API
    // Asegúrate de tener un endpoint correcto para cargar los empleados
    const res = await fetch("/api/empleados");
    const data = await res.json();
    setEmpleados(data);
  }

  async function createEmpleado(empleado: CreateEmpleados) {
    // Aquí debes implementar la lógica para crear un empleado en tu API
    const res = await fetch("/api/empleados", {
      method: "POST",
      body: JSON.stringify(empleado),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newEmpleado = await res.json();
    setEmpleados([...empleados, newEmpleado]);
  }

  async function deleteEmpleado(id: number) {
    // Aquí debes implementar la lógica para eliminar un empleado en tu API
    const res = await fetch("/api/empleados/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setEmpleados(empleados.filter((empleado) => empleado.id !== id));
  }

  async function updateEmpleado(id: number, empleado: UpdateEmpleados) {
    // Aquí debes implementar la lógica para actualizar un empleado en tu API
    const res = await fetch("/api/empleados/" + id, {
      method: "PUT",
      body: JSON.stringify(empleado),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setEmpleados(empleados.map((empleado) => (empleado.id === id ? data : empleado)));
  }

  return (
    <EmpleadosContext.Provider
      value={{
        empleados,
        loadEmpleados,
        createEmpleado,
        deleteEmpleado,
        selectedEmpleado,
        setSelectedEmpleado,
        updateEmpleado,
      }}
    >
      {children}
    </EmpleadosContext.Provider>
  );
};