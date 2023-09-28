'use client'
import React, { useEffect, useState } from "react";
import { Pedidos } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { usePedidos } from "@/context/PedidosContext";
import { pedidosColumns } from "@/models/pedidosModel";
import Modal from "@/components/Modal";
import SuccessModal from "@/components/SuccessModal";
import { transformPedidosToRows } from "@/models/pedidosModel";
import DynamicForm from "@/components/DynamicForm";
import pedidosProps from "@/models/pedidosProps";

const columns = (Object.keys(pedidosColumns) as (keyof Pedidos)[]).map(
  (key) => ({ key, label: pedidosColumns[key] })
);

function PedidosPage() {
  const {
    pedidos,
    loadPedidos,
    createPedidos,
    deletePedidos,
    selectedPedidos,
    setSelectedPedidos,
    updatePedidos,
  } = usePedidos();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [pedidosToDelete, setPedidosToDelete] = useState<Pedidos | null>(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    loadPedidos();
  }, []);

  const openDeleteModal = (pedido: Pedidos) => {
    setPedidosToDelete(pedido);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setPedidosToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditPedidos = (pedido: Pedidos) => {
    setSelectedPedidos(pedido);
    setIsFormVisible(true);
  };

  const handleDelete = (pedido: Pedidos) => {
    openDeleteModal(pedido);
  };

  const handleNewClick = () => {
    setSelectedPedidos(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdatePedidos = async (formData: any) => {
    try {
      if (selectedPedidos) {
        // Estás editando un cliente existente
        await updatePedidos(selectedPedidos.id, formData);
      } else {
        // Estás creando un nuevo cliente
        await createPedidos(formData);
      }
      setIsFormVisible(false);
      setSelectedPedidos(null);
      loadPedidos();
    } catch (error) {
      console.error("Error al crear o actualizar el Pedido:", error);
    }
  };

  const handleUpdateClick = async () => {
    try {
      if (selectedPedidos) {
        // Estás editando un cliente existente
        await updatePedidos(selectedPedidos.id, formData); // Envía los datos actualizados al servidor
      }
      setIsFormVisible(false);
      setSelectedPedidos(null);
      loadPedidos();
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  const rowsPedidos = transformPedidosToRows(pedidos);

  

  return (
    <div>
      <DataTable
        title={"Pedidos"}
        data={rowsPedidos}
        columns={columns}
        onEdit={handleEditPedidos}
        onDelete={handleDelete}
        onNew={handleNewClick}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar la Materia Prima ${pedidosToDelete?.cliente_id}?`}
        onConfirm={async () => {
          try {
            if (pedidosToDelete) {
              await deletePedidos(pedidosToDelete.id);
              closeDeleteModal();
              setIsDeleteSuccess(true);
              loadPedidos();
            }
          } catch (error) {
            console.error("Error al eliminar el Pedido:", error);
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
        message="El pedido se ha eliminado correctamente."
        buttonText="Aceptar"
      />

<Modal
        isOpen={isFormVisible}
        title={selectedPedidos ? "Editar Pedido" : "Nueva Pedido"}
        onCancel={() => {
          setIsFormVisible(false);
          setSelectedPedidos(null); 
        }}
        showCancelButton={true}
        showConfirmButton={false}
        showUpdateButton={false}
        onConfirm={handleCreateOrUpdatePedidos}
      >
      <DynamicForm
        
        formProps={pedidosProps}
        onSubmit={handleCreateOrUpdatePedidos}
        showCreateButton={!selectedPedidos}
        showUpdateButton={!!selectedPedidos}
        initialFormData={selectedPedidos}
        onUpdateClick={handleUpdateClick} // Pasa la función handleUpdateClick al DynamicForm
        columns={2}
     
      />
      </Modal>
    </div>
  );
}

export default PedidosPage;