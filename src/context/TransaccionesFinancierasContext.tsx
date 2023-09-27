// TransaccionesFinancierasContext.tsx

import { createContext, useState, useContext } from "react";
import { CreateTransaccionesFinancieras, UpdateTransaccionesFinancieras } from "@/interfaces/TransaccionesFinancieras";
import { TransaccionesFinancieras } from "@prisma/client";

export const TransaccionesFinancierasContext = createContext<{
  transaccionesFinancieras: TransaccionesFinancieras[];
  loadTransaccionesFinancieras: () => Promise<void>;
  createTransaccionesFinancieras: (transaccion: CreateTransaccionesFinancieras) => Promise<void>;
  deleteTransaccionesFinancieras: (id: number) => Promise<void>;
  selectedTransaccionesFinancieras: TransaccionesFinancieras | null;
  setSelectedTransaccionesFinancieras: (transaccion: TransaccionesFinancieras | null) => void;
  updateTransaccionesFinancieras: (id: number, transaccion: UpdateTransaccionesFinancieras) => Promise<void>;
}>({
  transaccionesFinancieras: [],
  loadTransaccionesFinancieras: async () => {},
  createTransaccionesFinancieras: async (transaccion: CreateTransaccionesFinancieras) => {},
  deleteTransaccionesFinancieras: async (id: number) => {},
  selectedTransaccionesFinancieras: null,
  setSelectedTransaccionesFinancieras: (transaccion: TransaccionesFinancieras | null) => {},
  updateTransaccionesFinancieras: async (id: number, transaccion: UpdateTransaccionesFinancieras) => {},
});

export const useTransaccionesFinancieras = () => {
  const context = useContext(TransaccionesFinancierasContext);
  if (!context) {
    throw new Error("useTransaccionesFinancieras must be used within a TransaccionesFinancierasProvider");
  }
  return context;
};

export const TransaccionesFinancierasProvider = ({ children }: { children: React.ReactNode }) => {
  const [transaccionesFinancieras, setTransaccionesFinancieras] = useState<TransaccionesFinancieras[]>([]);
  const [selectedTransaccionesFinancieras, setSelectedTransaccionesFinancieras] = useState<TransaccionesFinancieras | null>(
    null
  );

  async function loadTransaccionesFinancieras() {
    const res = await fetch("/api/transaccionesFinancieras"); // Asegúrate de tener un endpoint correcto para cargar las transacciones
    const data = await res.json();
    setTransaccionesFinancieras(data);
  }

  async function createTransaccionesFinancieras(transaccion: CreateTransaccionesFinancieras) {
    const res = await fetch("/api/transaccionesFinancieras", {
      method: "POST",
      body: JSON.stringify(transaccion),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newTransaccion = await res.json();
    setTransaccionesFinancieras([...transaccionesFinancieras, newTransaccion]);
  }

  async function deleteTransaccionesFinancieras(id: number) {
    const res = await fetch("/api/transaccionesFinancieras/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setTransaccionesFinancieras(transaccionesFinancieras.filter((transaccion) => transaccion.id !== id));
  }

  async function updateTransaccionesFinancieras(id: number, transaccion: UpdateTransaccionesFinancieras) {
    const res = await fetch("/api/transaccionesFinancieras/" + id, {
      method: "PUT",
      body: JSON.stringify(transaccion),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setTransaccionesFinancieras(
      transaccionesFinancieras.map((transaccion) => (transaccion.id === id ? data : transaccion))
    );
  }

  return (
    <TransaccionesFinancierasContext.Provider
      value={{
        transaccionesFinancieras,
        loadTransaccionesFinancieras,
        createTransaccionesFinancieras,
        deleteTransaccionesFinancieras,
        selectedTransaccionesFinancieras,
        setSelectedTransaccionesFinancieras,
        updateTransaccionesFinancieras,
      }}
    >
      {children}
    </TransaccionesFinancierasContext.Provider>
  );
};
