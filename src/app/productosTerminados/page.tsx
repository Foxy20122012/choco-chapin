'use client'
import React, { useEffect, useState } from "react";
import {  ProductosTerminados } from "@prisma/client";
import DataTable from "@/components/DataTable";
// import { useClientes } from "@/context/ClientesContext";
import { productosTerminadosColumns } from "@/models/productosTerminadosModel";
import Modal from "@/components/Modal";
import SuccessModal from "@/components/SuccessModal";
import { transformProductosTerminadosToRows } from "@/models/productosTerminadosModel";
import DynamicForm from "@/components/DynamicForm";
import productosTerminadosProps from "@/models/productosTerminadosProps";
import { useProductosTerminados } from "@/context/ProductosTerminadosContext";
import useHasMounted from '@/hooks/useHasMounted';
import Loadig from '@/components/Loading';

const columns = (Object.keys(productosTerminadosColumns) as (keyof ProductosTerminados)[]).map(
  (key) => ({ key, label: productosTerminadosColumns[key] })
);

function ProductosTerminadosPage() {
  const {
    productosTerminados,
    loadProductosTerminados,
    createProductosTerminados,
    deleteProductosTerminados,
    selectedProductosTerminados,
    setSelectedProductosTerminados,
    updateProductosTerminados,
  } = useProductosTerminados();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [productosTerminadosToDelete, setProductosTerminadosToDelete] = useState<ProductosTerminados | null>(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    loadProductosTerminados();
  }, []);

  const openDeleteModal = (ProductoTerminado: ProductosTerminados) => {
    setProductosTerminadosToDelete(ProductoTerminado);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProductosTerminadosToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditProductosTerminados = (ProductoTerminado: ProductosTerminados) => {
    setSelectedProductosTerminados(ProductoTerminado);
    setIsFormVisible(true);
  };

  const handleDelete = (ProductoTerminado: ProductosTerminados) => {
    openDeleteModal(ProductoTerminado);
  };

  const handleNewClick = () => {
    setSelectedProductosTerminados(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdateProductosTerminados = async (formData: any) => {
    try {
      if (selectedProductosTerminados) {
        // Estás editando un cliente existente
        await updateProductosTerminados(selectedProductosTerminados.id, formData);
      } else {
        // Estás creando un nuevo cliente
        await createProductosTerminados(formData);
      }
      setIsFormVisible(false);
      setSelectedProductosTerminados(null);
      loadProductosTerminados();
    } catch (error) {
      console.error("Error al crear o actualizar el cliente:", error);
    }
  };

  const handleUpdateClick = async () => {
    try {
      if (selectedProductosTerminados) {
        // Estás editando un cliente existente
        await updateProductosTerminados(selectedProductosTerminados.id, formData); // Envía los datos actualizados al servidor
      }
      setIsFormVisible(false);
      setSelectedProductosTerminados(null);
      loadProductosTerminados();
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  const rowsProductosTerminados = transformProductosTerminadosToRows(productosTerminados);

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return<Loadig />;
  }

  return (
    <div>
      <DataTable
        title={"Productos Terminados"}
        data={rowsProductosTerminados}
        columns={columns}
        onEdit={handleEditProductosTerminados}
        onDelete={handleDelete}
        onNew={handleNewClick}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar al cliente ${productosTerminadosToDelete?.nombre}?`}
        onConfirm={async () => {
          try {
            if (productosTerminadosToDelete) {
              await deleteProductosTerminados(productosTerminadosToDelete.id);
              closeDeleteModal();
              setIsDeleteSuccess(true);
              loadProductosTerminados();
            }
          } catch (error) {
            console.error("Error al eliminar el Productos Terminados:", error);
          }
        }}
        onCancel={closeDeleteModal}
        onUpdate={handleUpdateClick}
        showUpdateButton={false}
        showConfirmButton={true} // Configura según tus necesidades
        
      />
      <SuccessModal
        isOpen={isDeleteSuccess}
        onClose={() => setIsDeleteSuccess(false)}
        message="El Producto Terminado se ha eliminado correctamente."
        buttonText="Aceptar"
      />

<Modal
        isOpen={isFormVisible}
        title={selectedProductosTerminados ? "Editar Producto Terminado" : "Nuevo Producto Terminado"}
        onCancel={() => {
          setIsFormVisible(false);
          setSelectedProductosTerminados(null); 
        }}
        showCancelButton={true}
        showConfirmButton={false}
        showUpdateButton={false}
        onConfirm={handleCreateOrUpdateProductosTerminados}
      >
      <DynamicForm
        
        formProps={productosTerminadosProps}
        onSubmit={handleCreateOrUpdateProductosTerminados}
        showCreateButton={!selectedProductosTerminados}
        showUpdateButton={!!selectedProductosTerminados}
        initialFormData={selectedProductosTerminados}
        onUpdateClick={handleUpdateClick} // Pasa la función handleUpdateClick al DynamicForm
        columns={1}
     
      />
      </Modal>
    </div>
  );
}

export default ProductosTerminadosPage;
