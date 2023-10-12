// ProductosTerminadosContext.tsx
'use client'
import { createContext, useState, useContext } from "react";
import { CreateProductosTerminados, UpdateProductosTerminados } from "@/interfaces/ProductosTerminados";
import { ProductosTerminados } from "@prisma/client";

export const ProductosTerminadosContext = createContext<{
  productosTerminados: ProductosTerminados[];
  loadProductosTerminados: () => Promise<void>;
  createProductosTerminados: (productosTerminados: CreateProductosTerminados) => Promise<void>;
  deleteProductosTerminados: (id: number) => Promise<void>;
  selectedProductosTerminados: ProductosTerminados | null;
  setSelectedProductosTerminados: (productosTerminados: ProductosTerminados | null) => void;
  updateProductosTerminados: (id: number, productosTerminados: UpdateProductosTerminados) => Promise<void>;
}>({
  productosTerminados: [],
  loadProductosTerminados: async () => {},
  createProductosTerminados: async (productosTerminados: CreateProductosTerminados) => {},
  deleteProductosTerminados: async (id: number) => {},
  selectedProductosTerminados: null,
  setSelectedProductosTerminados: (productosTerminados: ProductosTerminados | null) => {},
  updateProductosTerminados: async (id: number, productosTerminados: UpdateProductosTerminados) => {},
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
  const [selectedProductosTerminados, setSelectedProductosTerminados] = useState<ProductosTerminados | null>(null);

  async function loadProductosTerminados() {
    try {
      const res = await fetch("/api/productosTerminados"); // Reemplaza con la ruta correcta de tu API
      const data = await res.json();
      setProductosTerminados(data);
    } catch (error) {
      console.error("Error loading productos terminados", error);
    }
  }

  async function createProductosTerminados(productosTerminados: CreateProductosTerminados) {
    try {
      const res = await fetch("/api/productosTerminados", {
        method: "POST",
        body: JSON.stringify(productosTerminados),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.status === 200) {
        const newProductosTerminados = await res.json();
        setProductosTerminados((productos) => [...productos, newProductosTerminados]);
      } else {
        console.error("Error creating productos terminados");
      }
    } catch (error) {
      console.error("Error creating productos terminados", error);
    }
  }
  

  async function deleteProductosTerminados(id: number) {
    try {
      const res = await fetch(`/api/productosTerminados/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setProductosTerminados(productosTerminados.filter((productosTerminados) => productosTerminados.id !== id));
      } else {
        console.error("Error deleting productos terminados");
      }
    } catch (error) {
      console.error("Error deleting productos terminados", error);
    }
  }

  async function updateProductosTerminados(id: number, productosTerminados: UpdateProductosTerminados) {
    try {
      const res = await fetch(`/api/productosTerminados/${id}`, {
        method: "PUT",
        body: JSON.stringify(productosTerminados),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const updatedProductosTerminados = await res.json();
        setProductosTerminados((productos) =>
          productos.map((producto) => (producto.id === id ? updatedProductosTerminados : producto))
        );
      } else {
        console.error("Error updating productos terminados");
      }
    } catch (error) {
      console.error("Error updating productos terminados", error);
    }
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
