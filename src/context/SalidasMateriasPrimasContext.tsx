// SalidasMateriasPrimasContext.tsx

import { createContext, useState, useContext } from "react";
import { CreateSalidasMateriasPrimas, UpdateSalidasMateriasPrimas } from "@/interfaces/SalidasMateriasPrimas";
import { SalidasMateriasPrimas } from "@prisma/client";

export const SalidasMateriasPrimasContext = createContext<{
  salidasMateriasPrimas: SalidasMateriasPrimas[];
  loadSalidasMateriasPrimas: () => Promise<void>;
  createSalidasMateriasPrimas: (salida: CreateSalidasMateriasPrimas) => Promise<void>;
  deleteSalidasMateriasPrimas: (id: number) => Promise<void>;
  selectedSalidasMateriasPrimas: SalidasMateriasPrimas | null;
  setSelectedSalidasMateriasPrimas: (salida: SalidasMateriasPrimas | null) => void;
  updateSalidasMateriasPrimas: (id: number, salida: UpdateSalidasMateriasPrimas) => Promise<void>;
}>({
  salidasMateriasPrimas: [],
  loadSalidasMateriasPrimas: async () => {},
  createSalidasMateriasPrimas: async (salida: CreateSalidasMateriasPrimas) => {},
  deleteSalidasMateriasPrimas: async (id: number) => {},
  selectedSalidasMateriasPrimas: null,
  setSelectedSalidasMateriasPrimas: (salida: SalidasMateriasPrimas | null) => {},
  updateSalidasMateriasPrimas: async (id: number, salida: UpdateSalidasMateriasPrimas) => {},
});

export const useSalidasMateriasPrimas = () => {
  const context = useContext(SalidasMateriasPrimasContext);
  if (!context) {
    throw new Error("useSalidasMateriasPrimas must be used within a SalidasMateriasPrimasProvider");
  }
  return context;
};

export const SalidasMateriasPrimasProvider = ({ children }: { children: React.ReactNode }) => {
  const [salidasMateriasPrimas, setSalidasMateriasPrimas] = useState<SalidasMateriasPrimas[]>([]);
  const [selectedSalidasMateriasPrimas, setSelectedSalidasMateriasPrimas] = useState<SalidasMateriasPrimas | null>(
    null
  );

  async function loadSalidasMateriasPrimas() {
    const res = await fetch("/api/salidasMateriasPrimas"); // Asegúrate de tener un endpoint correcto para cargar las salidas
    const data = await res.json();
    setSalidasMateriasPrimas(data);
  }

  async function createSalidasMateriasPrimas(salida: CreateSalidasMateriasPrimas) {
    const res = await fetch("/api/salidasMateriasPrimas", {
      method: "POST",
      body: JSON.stringify(salida),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newSalida = await res.json();
    setSalidasMateriasPrimas([...salidasMateriasPrimas, newSalida]);
  }

  async function deleteSalidasMateriasPrimas(id: number) {
    const res = await fetch("/api/salidasMateriasPrimas/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setSalidasMateriasPrimas(salidasMateriasPrimas.filter((salida) => salida.id !== id));
  }

  async function updateSalidasMateriasPrimas(id: number, salida: UpdateSalidasMateriasPrimas) {
    const res = await fetch("/api/salidasMateriasPrimas/" + id, {
      method: "PUT",
      body: JSON.stringify(salida),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setSalidasMateriasPrimas(
      salidasMateriasPrimas.map((salida) => (salida.id === id ? data : salida))
    );
  }

  return (
    <SalidasMateriasPrimasContext.Provider
      value={{
        salidasMateriasPrimas,
        loadSalidasMateriasPrimas,
        createSalidasMateriasPrimas,
        deleteSalidasMateriasPrimas,
        selectedSalidasMateriasPrimas,
        setSelectedSalidasMateriasPrimas,
        updateSalidasMateriasPrimas,
      }}
    >
      {children}
    </SalidasMateriasPrimasContext.Provider>
  );
};


