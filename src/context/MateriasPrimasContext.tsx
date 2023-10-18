import { createContext, useState, useContext } from "react";
import { CreateMateriasPrimas, UpdateMateriasPrimas } from "@/interfaces/MateriasPrimas";
import { MateriasPrimas } from "@prisma/client";

export const MateriasPrimasContext = createContext<{
  materiasPrimas: MateriasPrimas[];
  loadMateriasPrimas: () => Promise<void>;
  createMateriasPrimas: (materiaPrima: CreateMateriasPrimas) => Promise<void>;
  deleteMateriasPrimas: (id: number) => Promise<void>;
  selectedMateriasPrimas: MateriasPrimas | null;
  setSelectedMateriasPrimas: (materiaPrima: MateriasPrimas | null) => void;
  updateMateriasPrimas: (id: number, materiaPrima: UpdateMateriasPrimas) => Promise<void>;
}>({
  materiasPrimas: [],
  loadMateriasPrimas: async () => {},
  createMateriasPrimas: async (materiaPrima: CreateMateriasPrimas) => {},
  deleteMateriasPrimas: async (id: number) => {},
  selectedMateriasPrimas: null,
  setSelectedMateriasPrimas: (materiaPrima: MateriasPrimas | null) => {},
  updateMateriasPrimas: async (id: number, materiaPrima: UpdateMateriasPrimas) => {},
});

export const useMateriasPrimas = () => {
  const context = useContext(MateriasPrimasContext);
  if (!context) {
    throw new Error("useMateriasPrimas must be used within a MateriasPrimasProvider");
  }
  return context;
};

export const MateriasPrimasProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [materiasPrimas, setMateriasPrimas] = useState<MateriasPrimas[]>([]);
  const [selectedMateriasPrimas, setSelectedMateriasPrimas] = useState<MateriasPrimas | null>(null);

  async function loadMateriasPrimas() {
    const res = await fetch("/api/materiasPrimas");
    const data = await res.json();
    setMateriasPrimas(data);
  }

  async function createMateriasPrimas(materiaPrima: CreateMateriasPrimas) {
    const res = await fetch("/api/materiasPrimas", {
      method: "POST",
      body: JSON.stringify(materiaPrima),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newMateriaPrima = await res.json();
    setMateriasPrimas([...materiasPrimas, newMateriaPrima]);
  }

  async function deleteMateriasPrimas(id: number) {
    const res = await fetch("/api/materiasPrimas/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setMateriasPrimas(materiasPrimas.filter((materiaPrima) => materiaPrima.id !== id));
  }

  async function updateMateriasPrimas(id: number, materiaPrima: UpdateMateriasPrimas) {
    const res = await fetch("/api/materiasPrimas/" + id, {
      method: "PUT",
      body: JSON.stringify(materiaPrima),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setMateriasPrimas(
      materiasPrimas.map((materiaPrima) => (materiaPrima.id === id ? data : materiaPrima))
    );
  }

  return (
    <MateriasPrimasContext.Provider
      value={{
        materiasPrimas,
        loadMateriasPrimas,
        createMateriasPrimas,
        deleteMateriasPrimas,
        selectedMateriasPrimas,
        setSelectedMateriasPrimas,
        updateMateriasPrimas,
      }}
    >
      {children}
    </MateriasPrimasContext.Provider>
  );
};
