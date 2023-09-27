// PedidosContext.tsx

import { createContext, useState, useContext } from "react";
import { CreatePedidos, UpdatePedidos } from "@/interfaces/Pedidos";
import { Pedidos } from "@prisma/client";

export const PedidosContext = createContext<{
  pedidos: Pedidos[];
  loadPedidos: () => Promise<void>;
  createPedidos: (pedido: CreatePedidos) => Promise<void>;
  deletePedidos: (id: number) => Promise<void>;
  selectedPedidos: Pedidos | null;
  setSelectedPedidos: (pedido: Pedidos | null) => void;
  updatePedidos: (id: number, pedido: UpdatePedidos) => Promise<void>;
}>({
  pedidos: [],
  loadPedidos: async () => {},
  createPedidos: async (pedido: CreatePedidos) => {},
  deletePedidos: async (id: number) => {},
  selectedPedidos: null,
  setSelectedPedidos: (pedido: Pedidos | null) => {},
  updatePedidos: async (id: number, pedido: UpdatePedidos) => {},
});

export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error("usePedidos must be used within a PedidosProvider");
  }
  return context;
};

export const PedidosProvider = ({ children }: { children: React.ReactNode }) => {
  const [pedidos, setPedidos] = useState<Pedidos[]>([]);
  const [selectedPedidos, setSelectedPedidos] = useState<Pedidos | null>(
    null
  );

  async function loadPedidos() {
    const res = await fetch("/api/pedidos"); // Asegúrate de tener un endpoint correcto para cargar los pedidos
    const data = await res.json();
    setPedidos(data);
  }

  async function createPedidos(pedido: CreatePedidos) {
    const res = await fetch("/api/pedidos", {
      method: "POST",
      body: JSON.stringify(pedido),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newPedido = await res.json();
    setPedidos([...pedidos, newPedido]);
  }

  async function deletePedidos(id: number) {
    const res = await fetch("/api/pedidos/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setPedidos(pedidos.filter((pedido) => pedido.id !== id));
  }

  async function updatePedidos(id: number, pedido: UpdatePedidos) {
    const res = await fetch("/api/pedidos/" + id, {
      method: "PUT",
      body: JSON.stringify(pedido),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setPedidos(
      pedidos.map((pedido) => (pedido.id === id ? data : pedido))
    );
  }

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        loadPedidos,
        createPedidos,
        deletePedidos,
        selectedPedidos,
        setSelectedPedidos,
        updatePedidos,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};
