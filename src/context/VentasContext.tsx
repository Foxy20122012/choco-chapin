// VentasContext.tsx

import { createContext, useState, useContext } from "react";
import { CreateVentas, UpdateVentas } from "@/interfaces/Ventas";
import { Ventas } from "@prisma/client";

export const VentasContext = createContext<{
  ventas: Ventas[];
  loadVentas: () => Promise<void>;
  createVentas: (venta: CreateVentas) => Promise<void>;
  deleteVentas: (id: number) => Promise<void>;
  selectedVentas: Ventas | null;
  setSelectedVentas: (venta: Ventas | null) => void;
  updateVentas: (id: number, venta: UpdateVentas) => Promise<void>;
}>({
  ventas: [],
  loadVentas: async () => {},
  createVentas: async (venta: CreateVentas) => {},
  deleteVentas: async (id: number) => {},
  selectedVentas: null,
  setSelectedVentas: (venta: Ventas | null) => {},
  updateVentas: async (id: number, venta: UpdateVentas) => {},
});

export const useVentas = () => {
  const context = useContext(VentasContext);
  if (!context) {
    throw new Error("useVentas must be used within a VentasProvider");
  }
  return context;
};

export const VentasProvider = ({ children }: { children: React.ReactNode }) => {
  const [ventas, setVentas] = useState<Ventas[]>([]);
  const [selectedVentas, setSelectedVentas] = useState<Ventas | null>(null);

  async function loadVentas() {
    const res = await fetch("/api/ventas"); // Asegúrate de tener un endpoint correcto para cargar las ventas
    const data = await res.json();
    setVentas(data);
  }

  async function createVentas(venta: CreateVentas) {
    const res = await fetch("/api/ventas", {
      method: "POST",
      body: JSON.stringify(venta),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newVenta = await res.json();
    setVentas([...ventas, newVenta]);
  }

  async function deleteVentas(id: number) {
    const res = await fetch("/api/ventas/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setVentas(ventas.filter((venta) => venta.id !== id));
  }

  async function updateVentas(id: number, venta: UpdateVentas) {
    const res = await fetch("/api/ventas/" + id, {
      method: "PUT",
      body: JSON.stringify(venta),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setVentas(
      ventas.map((venta) => (venta.id === id ? data : venta))
    );
  }

  return (
    <VentasContext.Provider
      value={{
        ventas,
        loadVentas,
        createVentas,
        deleteVentas,
        selectedVentas,
        setSelectedVentas,
        updateVentas,
      }}
    >
      {children}
    </VentasContext.Provider>
  );
};
