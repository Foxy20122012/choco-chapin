// FacturasContext.tsx

import { createContext, useState, useContext } from "react";
import { CreateFacturas, UpdateFacturas } from "@/interfaces/Facturas";
import { Facturas } from "@prisma/client";

export const FacturasContext = createContext<{
  facturas: Facturas[];
  loadFacturas: () => Promise<void>;
  createFacturas: (facturas: CreateFacturas) => Promise<void>;
  deleteFacturas: (id: number) => Promise<void>;
  selectedFacturas: Facturas | null;
  setSelectedFacturas: (facturas: Facturas | null) => void;
  updateFacturas: (id: number, facturas: UpdateFacturas) => Promise<void>;
}>({
  facturas: [],
  loadFacturas: async () => {},
  createFacturas: async (facturas: CreateFacturas) => {},
  deleteFacturas: async (id: number) => {},
  selectedFacturas: null,
  setSelectedFacturas: (facturas: Facturas | null) => {},
  updateFacturas: async (id: number, facturas: UpdateFacturas) => {},
});

export const useFacturas = () => {
  const context = useContext(FacturasContext);
  if (!context) {
    throw new Error("useFacturas must be used within a FacturasProvider");
  }
  return context;
};

export const FacturasProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [facturas, setFacturas] = useState<Facturas[]>([]);
  const [selectedFacturas, setSelectedFacturas] = useState<Facturas | null>(
    null
  );

  async function loadFacturas() {
    const res = await fetch("/api/facturas");
    const data = await res.json();
    setFacturas(data);
  }

  async function createFacturas(factura: CreateFacturas) {
    const res = await fetch("/api/facturas", {
      method: "POST",
      body: JSON.stringify(factura),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newFactura = await res.json();
    setFacturas([...facturas, newFactura]);
  }

  async function deleteFacturas(id: number) {
    const res = await fetch("/api/facturas/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setFacturas(facturas.filter((factura) => factura.id !== id));
  }

  async function updateFacturas(id: number, factura: UpdateFacturas) {
    const res = await fetch("/api/facturas/" + id, {
      method: "PUT",
      body: JSON.stringify(factura),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setFacturas(
      facturas.map((factura) => (factura.id === id ? data : factura))
    );
  }

  return (
    <FacturasContext.Provider
      value={{
        facturas,
        loadFacturas,
        createFacturas,
        deleteFacturas,
        selectedFacturas,
        setSelectedFacturas,
        updateFacturas,
      }}
    >
      {children}
    </FacturasContext.Provider>
  );
};
