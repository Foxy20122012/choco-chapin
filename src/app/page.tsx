"use client";
import React, { useEffect, useState } from "react";
import { Clientes } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useClientes } from "@/context/ClientesContext";
import { clientesColumns } from "@/models/clientesModel";
import Modal from "@/components/Modal"; 
import DeleteSuccessModal from "@/components/DeleteSuccessModal"; 
import { transformClientesToRows,Row } from "@/models/clientesModel";



const columns = (Object.keys(clientesColumns) as (keyof Clientes)[]).map(
  (key) => ({ key, label: clientesColumns[key] })
);

function HomePage() {

  const { clientes, loadClientes, updateCliente, deleteCliente } = useClientes(); // Asegúrate de usar el contexto correcto
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [clientToDelete, setClientToDelete] = useState<Clientes | null>(null); // Guarda el cliente que se eliminará
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  //Se transforman los datos a la manera correcta en que debe recibir el clientes el DataTable
  const rowsClientes = transformClientesToRows(clientes);

  useEffect(() => {
    loadClientes(); // Carga los clientes desde la base de datos cuando el componente se monta
  }, []);

  const openDeleteModal = (client: Clientes) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setClientToDelete(null);
    setIsDeleteModalOpen(false);
  };

  

  
  const handleDelete = (cliente: Clientes) => {
    openDeleteModal(cliente);
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
        onNew={(row) => {
          console.log("Nuevo:", row)
        }}
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
    </div>
  );
}

export default HomePage;
