'use client'
import React, { useEffect, useState } from "react";
import { ProductosTerminados } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useProductosTerminados } from "@/context/ProductosTerminadosContext";
import { productosTerminadosColumns } from "@/models/productosTerminadosModel";
import Modal from "@/components/Modal";
import SuccessModal from "@/components/SuccessModal";
import { transformProductosTerminadosToRows } from "@/models/productosTerminadosModel";
import DynamicForm from "@/components/DynamicForm";
import productosTerminadosProps from "@/models/productosTerminadosProps";
import useHasMounted from '@/hooks/useHasMounted';
import Loadig from '@/components/Loading';

const columns = (Object.keys(productosTerminadosColumns) as (keyof ProductosTerminados)[]).map(
  (key) => ({ key, label: productosTerminadosColumns[key] })
);

function PedidosPage() {
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

  const openDeleteModal = (productoTerminado: ProductosTerminados) => {
    setProductosTerminadosToDelete(productoTerminado);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProductosTerminadosToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditPedidos = (productoTerminado: ProductosTerminados) => {
    setSelectedProductosTerminados(productoTerminado);
    setIsFormVisible(true);
  };

  const handleDelete = (productoTerminado: ProductosTerminados) => {
    openDeleteModal(productoTerminado);
  };

  const handleNewClick = () => {
    setSelectedProductosTerminados(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdatePedidos = async (formData: any) => {
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
      console.error("Error al crear o actualizar el Pedido:", error);
    }
  };

  const handleUpdateClick = async (formData: any) => {
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

  const rowsPedidos = transformProductosTerminadosToRows(productosTerminados);

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return<Loadig />;
  }

  return (
    <div>
      <DataTable
        title={"Productos terminados"}
         // @ts-ignore
        data={rowsPedidos}
        columns={columns}
        // @ts-ignore
        onEdit={handleEditPedidos}
         // @ts-ignore
        onDelete={handleDelete}
        onNew={handleNewClick}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar la Materia Prima ${productosTerminadosToDelete?.id}?`}
        onConfirm={async () => {
          try {
            if (productosTerminadosToDelete) {
              await deleteProductosTerminados(productosTerminadosToDelete.id);
              closeDeleteModal();
              setIsDeleteSuccess(true);
              loadProductosTerminados();
            }
          } catch (error) {
            console.error("Error al eliminar el Pedido:", error);
          }
        }}
        onCancel={closeDeleteModal}
         // @ts-ignore
        onUpdate={handleUpdateClick}
        showUpdateButton={false}
        showConfirmButton={true} // Configura según tus necesidades
        
      />
      <SuccessModal
        isOpen={isDeleteSuccess}
        onClose={() => setIsDeleteSuccess(false)}
        message="El pedido se ha eliminado correctamente."
        buttonText="Aceptar"
      />

<Modal
        isOpen={isFormVisible}
        title={selectedProductosTerminados ? "Editar Pedido" : "Nueva Pedido"}
        onCancel={() => {
          setIsFormVisible(false);
          setSelectedProductosTerminados(null); 
        }}
        showCancelButton={true}
        showConfirmButton={false}
        showUpdateButton={false}
         // @ts-ignore
        onConfirm={handleCreateOrUpdatePedidos}
      >
      <DynamicForm
        
        formProps={productosTerminadosProps}
        onSubmit={handleCreateOrUpdatePedidos}
        showCreateButton={!selectedProductosTerminados}
        showUpdateButton={!!selectedProductosTerminados}
        initialFormData={selectedProductosTerminados}
         // @ts-ignore
        onUpdateClick={handleUpdateClick} // Pasa la función handleUpdateClick al DynamicForm
        columns={2}
     
      />
      </Modal>
    </div>
  );
}

export default PedidosPage;