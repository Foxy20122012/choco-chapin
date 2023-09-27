// ProveedoresContext.tsx

import { createContext, useState, useContext } from "react";
import { CreateProveedores, UpdateProveedores } from "@/interfaces/Proveedores";
import { Proveedores } from "@prisma/client";

export const ProveedoresContext = createContext<{
  proveedores: Proveedores[];
  loadProveedores: () => Promise<void>;
  createProveedores: (proveedor: CreateProveedores) => Promise<void>;
  deleteProveedores: (id: number) => Promise<void>;
  selectedProveedores: Proveedores | null;
  setSelectedProveedores: (proveedor: Proveedores | null) => void;
  updateProveedores: (id: number, proveedor: UpdateProveedores) => Promise<void>;
}>({
  proveedores: [],
  loadProveedores: async () => {},
  createProveedores: async (proveedor: CreateProveedores) => {},
  deleteProveedores: async (id: number) => {},
  selectedProveedores: null,
  setSelectedProveedores: (proveedor: Proveedores | null) => {},
  updateProveedores: async (id: number, proveedor: UpdateProveedores) => {},
});

export const useProveedores = () => {
  const context = useContext(ProveedoresContext);
  if (!context) {
    throw new Error("useProveedores must be used within a ProveedoresProvider");
  }
  return context;
};

export const ProveedoresProvider = ({ children }: { children: React.ReactNode }) => {
  const [proveedores, setProveedores] = useState<Proveedores[]>([]);
  const [selectedProveedores, setSelectedProveedores] = useState<Proveedores | null>(
    null
  );

  async function loadProveedores() {
    const res = await fetch("/api/proveedores"); // Asegúrate de tener un endpoint correcto para cargar los proveedores
    const data = await res.json();
    setProveedores(data);
  }

  async function createProveedores(proveedor: CreateProveedores) {
    const res = await fetch("/api/proveedores", {
      method: "POST",
      body: JSON.stringify(proveedor),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newProveedor = await res.json();
    setProveedores([...proveedores, newProveedor]);
  }

  async function deleteProveedores(id: number) {
    const res = await fetch("/api/proveedores/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setProveedores(proveedores.filter((proveedor) => proveedor.id !== id));
  }

  async function updateProveedores(id: number, proveedor: UpdateProveedores) {
    const res = await fetch("/api/proveedores/" + id, {
      method: "PUT",
      body: JSON.stringify(proveedor),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setProveedores(
      proveedores.map((proveedor) => (proveedor.id === id ? data : proveedor))
    );
  }

  return (
    <ProveedoresContext.Provider
      value={{
        proveedores,
        loadProveedores,
        createProveedores,
        deleteProveedores,
        selectedProveedores,
        setSelectedProveedores,
        updateProveedores,
      }}
    >
      {children}
    </ProveedoresContext.Provider>
  );
};
