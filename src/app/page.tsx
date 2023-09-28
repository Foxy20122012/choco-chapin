"use client";
import React, { useEffect, useState } from "react";
import { Clientes } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useClientes } from "@/context/ClientesContext";
import { clientesColumns } from "@/models/clientesModel";
import Modal from "@/components/Modal"; 
import DeleteSuccessModal from "@/components/DeleteSuccessModal"; 
import { transformClientesToRows,Row } from "@/models/clientesModel";
import DynamicForm from "@/components/DynamicForm"; // Importa el componente DynamicForm
import clientesProps from "@/models/clientesProps"; // Importa tus props de clientes

const columns = (Object.keys(clientesColumns) as (keyof Clientes)[]).map(
  (key) => ({ key, label: clientesColumns[key] })
);

function HomePage() {
  const { clientes, createCliente, loadClientes, updateCliente, deleteCliente } = useClientes();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [clientToDelete, setClientToDelete] = useState<Clientes | null>(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false); // Estado para controlar la visibilidad del formulario

  // Se transforman los datos a la manera correcta en que debe recibir el DataTable
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

  const handleCreateCliente = async (data: any) => {
    try {
      await createCliente(data);
      setIsFormVisible(false);
      loadClientes();
    } catch (error) {
      console.error("Error al crear el cliente:", error);
    }
  };

  const handleDelete = (cliente: Clientes) => {
    openDeleteModal(cliente);
  };

  const handleNewClick = () => {
    setIsFormVisible(true);
  };

  return (
    <div>
      <DataTable
        title={"Clientes"}
        data={rowsClientes}
        columns={columns}
        onEdit={(row) => {
          console.log("Editar fila:", row);
        }}
        onDelete={handleDelete}
        onNew={handleNewClick} // Manejador para mostrar el formulario
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
      />
      <DeleteSuccessModal
        isOpen={isDeleteSuccess}
        onClose={() => setIsDeleteSuccess(false)}
        message="El cliente se ha eliminado correctamente."
        buttonText="Aceptar"
      />

      {/* Renderiza el formulario dinámico dentro del modal */}
      <Modal
        isOpen={isFormVisible}
        title="Nuevo Cliente" // Título del modal
        onCancel={() => setIsFormVisible(false)} // Manejador para cerrar el modal
        showCancelButton={true} // Mostrar el botón Cancelar
        showConfirmButton={false}
        showUpdateButton={false} // Ocultar el botón Actualizar
        onConfirm={handleCreateCliente}
      >
        <DynamicForm formProps={clientesProps} onSubmit={handleCreateCliente} />
      </Modal>
    </div>
  );
}

export default HomePage;
