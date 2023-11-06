"use client";
import React, { useEffect, useState } from "react";
import { Clientes } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useClientes } from "@/context/ClientesContext";
import { clientesColumns } from "@/models/clientesModel";
import Modal from "@/components/Modal";
import SuccessModal from "@/components/SuccessModal";
import { transformClientesToRows } from "@/models/clientesModel";
import DynamicForm from "@/components/DynamicForm";
import clientesProps from "@/models/clientesProps";
import useHasMounted from "@/hooks/useHasMounted";
import Loadig from "@/components/Loading";
import CountTag from "@/components/CountTag";
import { FaHeart } from "react-icons/fa";
import CustomTabs from "@/components/CustomTabs";
import tabContent from "@/models/tabsListClientes"


const columns = (Object.keys(clientesColumns) as (keyof Clientes)[]).map(
  (key) => ({ key, label: clientesColumns[key] })
);

function ClientesPage() {
  const {
    clientes,
    createCliente,
    loadClientes,
    deleteCliente,
    selectedCliente,
    setSelectedCliente,
    updateCliente,
  } = useClientes();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [clientToDelete, setClientToDelete] = useState<Clientes | null>(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const rowsClientes = transformClientesToRows(clientes);

  useEffect(() => {
    loadClientes();
  }, []);

  const openDeleteModal = (client: Clientes) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setClientToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditCliente = (client: Clientes) => {
    setSelectedCliente(client);
    setIsFormVisible(true);
  };

  const handleDelete = (cliente: Clientes) => {
    openDeleteModal(cliente);
  };

  const handleNewClick = () => {
    setSelectedCliente(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdateCliente = async (formData: any) => {
    try {
      if (selectedCliente) {
        // Estás editando un cliente existente
        await updateCliente(selectedCliente.id, formData);
      } else {
        // Estás creando un nuevo cliente
        await createCliente(formData);
      }
      setIsFormVisible(false);
      setSelectedCliente(null);
      loadClientes();
    } catch (error) {
      console.error("Error al crear o actualizar el cliente:", error);
    }
  };

  const handleUpdateClick = async (formData: any) => {
    try {
      if (selectedCliente) {
        // Estás editando un cliente existente
        await updateCliente(selectedCliente.id, formData); // Envía los datos actualizados al servidor
      }
      setIsFormVisible(false);
      setSelectedCliente(null);
      loadClientes();
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null; //<Loadig />
  }
  return (
    <div>
      <div>
        <DataTable
          title={"Clientes"}
          data={rowsClientes}
          columns={columns}
          onEdit={handleEditCliente}
          onDelete={handleDelete}
          onNew={handleNewClick}
        />
        <Modal
          isOpen={isDeleteModalOpen}
          title="Confirmar Eliminación"
          message={`¿Estás seguro de que deseas eliminar al cliente ${clientToDelete?.nombre}?`}
          onConfirm={async () => {
            try {
              if (clientToDelete) {
                await deleteCliente(clientToDelete.id);
                closeDeleteModal();
                setIsDeleteSuccess(true);
                loadClientes();
              }
            } catch (error) {
              console.error("Error al eliminar el cliente:", error);
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
          message="El cliente se ha eliminado correctamente."
          buttonText="Aceptar"
        />

        <Modal
          isOpen={isFormVisible}
          title={selectedCliente ? "Editar Cliente" : "Nuevo Cliente"}
          onCancel={() => {
            setIsFormVisible(false);
            setSelectedCliente(null);
          }}
          showCancelButton={true}
          showConfirmButton={false}
          showUpdateButton={false}
          // @ts-ignore
          onConfirm={handleCreateOrUpdateCliente}
        >
          <DynamicForm
            formProps={clientesProps}
            onSubmit={handleCreateOrUpdateCliente}
            showCreateButton={!selectedCliente}
            showUpdateButton={!!selectedCliente}
            initialFormData={selectedCliente}
            // @ts-ignore
            onUpdateClick={handleUpdateClick} // Pasa la función handleUpdateClick al DynamicForm
            columns={1}
          />
        </Modal>

        <CountTag
          datos="Ventas totales"
          icon={<FaHeart />} // Utiliza el ícono de un corazón de React Icons
          value={12500}
          theme="green"
          title="Resumen de ventas"
        />

        <div className="flex justify-center items-center">
          <CustomTabs tabs={tabContent} />
        </div>
      </div>
    </div>
  );
}

export default ClientesPage;
