// ProductosTerminadosContext.tsx

import { createContext, useState, useContext } from "react";
import { CreateProductosTerminados, UpdateProductosTerminados } from "@/interfaces/ProductosTerminados";
import { ProductosTerminados } from "@prisma/client";

export const ProductosTerminadosContext = createContext<{
  productosTerminados: ProductosTerminados[];
  loadProductosTerminados: () => Promise<void>;
  createProductosTerminados: (productoTerminado: CreateProductosTerminados) => Promise<void>;
  deleteProductosTerminados: (id: number) => Promise<void>;
  selectedProductosTerminados: ProductosTerminados | null;
  setSelectedProductosTerminados: (productoTerminado: ProductosTerminados | null) => void;
  updateProductosTerminados: (id: number, productoTerminado: UpdateProductosTerminados) => Promise<void>;
}>({
  productosTerminados: [],
  loadProductosTerminados: async () => {},
  createProductosTerminados: async (productoTerminado: CreateProductosTerminados) => {},
  deleteProductosTerminados: async (id: number) => {},
  selectedProductosTerminados: null,
  setSelectedProductosTerminados: (productoTerminado: ProductosTerminados | null) => {},
  updateProductosTerminados: async (id: number, productoTerminado: UpdateProductosTerminados) => {},
});

export const useProductosTerminados = () => {
  const context = useContext(ProductosTerminadosContext);
  if (!context) {
    throw new Error("useProductosTerminados must be used within a ProductosTerminadosProvider");
  }
  return context;
};

export const ProductosTerminadosProvider = ({ children }: { children: React.ReactNode }) => {
  const [productosTerminados, setProductosTerminados] = useState<ProductosTerminados[]>([]);
  const [selectedProductosTerminados, setSelectedProductosTerminados] = useState<ProductosTerminados | null>(
    null
  );

  async function loadProductosTerminados() {
    const res = await fetch("/api/productosTerminados"); // Asegúrate de tener un endpoint correcto para cargar los productosTerminados
    const data = await res.json();
    setProductosTerminados(data);
  }

  async function createProductosTerminados(productoTerminado: CreateProductosTerminados) {
    const res = await fetch("/api/productosTerminados", {
      method: "POST",
      body: JSON.stringify(productoTerminado),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newProductoTerminado = await res.json();
    setProductosTerminados([...productosTerminados, newProductoTerminado]);
  }

  async function deleteProductosTerminados(id: number) {
    const res = await fetch("/api/productosTerminados/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setProductosTerminados(productosTerminados.filter((productoTerminado) => productoTerminado.id !== id));
  }

  async function updateProductosTerminados(id: number, productoTerminado: UpdateProductosTerminados) {
    const res = await fetch("/api/productosTerminados/" + id, {
      method: "PUT",
      body: JSON.stringify(productoTerminado),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setProductosTerminados(
      productosTerminados.map((productoTerminado) => (productoTerminado.id === id ? data : productoTerminado))
    );
  }

  return (
    <ProductosTerminadosContext.Provider
      value={{
        productosTerminados,
        loadProductosTerminados,
        createProductosTerminados,
        deleteProductosTerminados,
        selectedProductosTerminados,
        setSelectedProductosTerminados,
        updateProductosTerminados,
      }}
    >
      {children}
    </ProductosTerminadosContext.Provider>
  );
};
