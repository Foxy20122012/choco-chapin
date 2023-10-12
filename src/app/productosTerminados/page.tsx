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
import Loading from '@/components/Loading';

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

  const openDeleteModal = (productoTerminado: ProductosTerminados) => {
    setProductosTerminadosToDelete(productoTerminado);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProductosTerminadosToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditProductosTerminados = (productoTerminado: ProductosTerminados) => {
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

  const handleCreateOrUpdateProductosTerminados = async (formData: any) => {
    try {
      if (selectedProductosTerminados) {
        await updateProductosTerminados(selectedProductosTerminados.id, formData);
      } else {
        await createProductosTerminados(formData);
      }
      setIsFormVisible(false);
      setSelectedProductosTerminados(null);
      loadProductosTerminados();
    } catch (error) {
      console.error("Error al crear o actualizar el producto terminado:", error);
    }
  };

  const handleUpdateClick = async (formData: any) => {
    try {
      if (selectedProductosTerminados) {
        await updateProductosTerminados(selectedProductosTerminados.id, formData);
      }
      setIsFormVisible(false);
      setSelectedProductosTerminados(null);
      loadProductosTerminados();
    } catch (error) {
      console.error("Error al actualizar el producto terminado:", error);
    }
  };

  const rowsProductosTerminados = transformProductosTerminadosToRows(productosTerminados);

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return <Loading />;
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
        message={`¿Estás seguro de que deseas eliminar el producto terminado ${productosTerminadosToDelete?.nombre}?`}
        onConfirm={async () => {
          try {
            if (productosTerminadosToDelete) {
              await deleteProductosTerminados(productosTerminadosToDelete.id);
              closeDeleteModal();
              setIsDeleteSuccess(true);
              loadProductosTerminados();
            }
          } catch (error) {
            console.error("Error al eliminar el producto terminado:", error);
          }
        }}
        onCancel={closeDeleteModal}
        onUpdate={handleUpdateClick}
        showUpdateButton={false}
        showConfirmButton={true}
      />
      <SuccessModal
        isOpen={isDeleteSuccess}
        onClose={() => setIsDeleteSuccess(false)}
        message="El producto terminado se ha eliminado correctamente."
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
          onUpdateClick={handleUpdateClick}
          columns={2}
        />
      </Modal>
    </div>
  );
}

export default ProductosTerminadosPage;
