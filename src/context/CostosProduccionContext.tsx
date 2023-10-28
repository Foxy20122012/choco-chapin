import { createContext, useState, useContext } from "react";
import { CreateCostosProduccion, UpdateCostosProduccion } from "@/interfaces/CostosProduccion";
import { CostosProduccion } from "@prisma/client";

export const CostosProduccionContext = createContext<{
  costosProduccion: CostosProduccion[];
  loadCostosProduccion: () => Promise<void>;
  createCostosProduccion: (costosProduccion: CreateCostosProduccion) => Promise<void>;
  deleteCostosProduccion: (id: number) => Promise<void>;
  selectedCostosProduccion: CostosProduccion | null;
  setSelectedCostosProduccion: (costosProduccion: CostosProduccion | null) => void;
  updateCostosProduccion: (id: number, costosProduccion: UpdateCostosProduccion) => Promise<void>;
}>({
  costosProduccion: [],
  loadCostosProduccion: async () => {},
  createCostosProduccion: async (costosProduccion: CreateCostosProduccion) => {},
  deleteCostosProduccion: async (id: number) => {},
  selectedCostosProduccion: null,
  setSelectedCostosProduccion: (costosProduccion: CostosProduccion | null) => {},
  updateCostosProduccion: async (id: number, costosProduccion: UpdateCostosProduccion) => {},
});

export const useCostosProduccion = () => {
  const context = useContext(CostosProduccionContext);
  if (!context) {
    throw new Error("useCostosProduccion must be used within a CostosProduccionProvider");
  }
  return context;
};

export const CostosProduccionProvider = ({ children }: { children: React.ReactNode }) => {
  const [costosProduccion, setCostosProduccion] = useState<CostosProduccion[]>([]);
  const [selectedCostosProduccion, setSelectedCostosProduccion] = useState<CostosProduccion | null>(null);

  async function loadCostosProduccion() {
    const res = await fetch("/api/costosProduccion");
    const data = await res.json();
    setCostosProduccion(data);
  }

  async function createCostosProduccion(costosProduccion: CreateCostosProduccion) {
    const res = await fetch("/api/costosProduccion", {
      method: "POST",
      body: JSON.stringify(costosProduccion),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newCostosProduccion = await res.json();
    setCostosProduccion((prevCostosProduccion) => [...prevCostosProduccion, newCostosProduccion]);
  }
  
  

  async function deleteCostosProduccion(id: number) {
    const res = await fetch("/api/costosProduccion/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setCostosProduccion(costosProduccion.filter((costos) => costos.id !== id));
  }

  async function updateCostosProduccion(id: number, costosProduccion: UpdateCostosProduccion) {
    const res = await fetch("/api/costosProduccion/" + id, {
      method: "PUT",
      body: JSON.stringify(costosProduccion),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedData = await res.json();
    setCostosProduccion((prevData) => {
      const index = prevData.findIndex((item) => item.id === id);
      if (index !== -1) {
        prevData[index] = updatedData;
      }
      return [...prevData];
    });
  }

  return (
    <CostosProduccionContext.Provider
      value={{
        costosProduccion,
        loadCostosProduccion,
        createCostosProduccion,
        deleteCostosProduccion,
        selectedCostosProduccion,
        setSelectedCostosProduccion,
        updateCostosProduccion,
      }}
    >
      {children}
    </CostosProduccionContext.Provider>
  );
};
