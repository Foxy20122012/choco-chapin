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
  createProductosTerminados: async () => {}, // Elimina el parámetro no utilizado
  deleteProductosTerminados: async () => {}, // Elimina el parámetro no utilizado
  selectedProductosTerminados: null,
  setSelectedProductosTerminados: () => {}, // Elimina el parámetro no utilizado
  updateProductosTerminados: async () => {}, // Elimina el parámetro no utilizado
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
    const res = await fetch("/api/productosTerminados");
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
    const res = await fetch("/api/productosTerminados" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setProductosTerminados(productosTerminados.filter((productoTerminado) => productoTerminado.id !== id));
  }

  async function updateProductosTerminados(id: number, productoTerminado: UpdateProductosTerminados) {
    try {
      const res = await fetch("/api/productosTerminados/" + id, {
        method: "PUT",
        body: JSON.stringify(productoTerminado),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        setProductosTerminados((productosTerminados) =>
          productosTerminados.map((productoTerminado) => (productoTerminado.id === id ? data : productoTerminado))
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
