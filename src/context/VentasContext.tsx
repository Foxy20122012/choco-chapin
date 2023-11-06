import { createContext, useState, useContext, useEffect } from "react";
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
  sumaMontoTotalPorUsuario: { [userId: string]: number };
}>({
  ventas: [],
  loadVentas: async () => {},
  createVentas: async (venta: CreateVentas) => {},
  deleteVentas: async (id: number) => {},
  selectedVentas: null,
  setSelectedVentas: (venta: Ventas | null) => {},
  updateVentas: async (id: number, venta: UpdateVentas) => {},
  sumaMontoTotalPorUsuario: {},
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
  const [sumaMontoTotalPorUsuario, setSumaMontoTotalPorUsuario] = useState<{ [userId: string]: number }>({});

  async function loadVentas() {
    const res = await fetch("/api/ventas");
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

  // Calcula la suma del monto total de ventas por usuario cuando las ventas cambian.
  useEffect(() => {
    if (!Array.isArray(ventas)) {
      // Si ventas no es un array válido, no hagas nada.
      return;
    }

    const sumaPorUsuario: { [userId: string]: number } = {};

    ventas.forEach((venta) => {
      const userId = venta.cliente_id?.toString() || "Sin Usuario";
      // @ts-ignore
      const total = parseFloat(venta.monto_total || 0);

      if (!sumaPorUsuario[userId]) {
        sumaPorUsuario[userId] = 0;
      }

      sumaPorUsuario[userId] += total;
    });

    setSumaMontoTotalPorUsuario(sumaPorUsuario);
  }, [ventas]);

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
        sumaMontoTotalPorUsuario,
      }}
    >
      {children}
    </VentasContext.Provider>
  );
};

