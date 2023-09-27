"use client";
import { useEffect, useState } from "react";
import { Clientes } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useClientes } from "@/context/ClientesContext";
import { clientesColumns } from "@/models/clientesModel";
import Modal from "@/components/Modal"; // Asegúrate de importar el componente Modal
import DeleteSuccessModal from "@/components/DeleteSuccessModal"; // Asegúrate de importar el componente DeleteSuccessModal


const columns = (Object.keys(clientesColumns) as (keyof Clientes)[]).map(
  (key) => ({ key, label: clientesColumns[key] })
);

function HomePage() {
  const { clientes, loadClientes, updateCliente, deleteCliente } = useClientes(); // Asegúrate de usar el contexto correcto
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [clientToDelete, setClientToDelete] = useState(null); // Guarda el cliente que se eliminará
const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);



  useEffect(() => {
    loadClientes(); // Carga los clientes desde la base de datos cuando el componente se monta
  }, []);

  const openDeleteModal = (client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setClientToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = (row) => {
    openDeleteModal(row);
  };

  return (
    <div>
    <DataTable
        title={"Clientes"}
        data={clientes}
        columns={columns}
        onEdit={(row) => {
          console.log("Editar fila:", row);
        }}
        onDelete={handleDelete}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar al cliente ${clientToDelete?.nombre}?`}
        onConfirm={async () => {
          try {
            await deleteCliente(clientToDelete.id);
            closeDeleteModal();
            setIsDeleteSuccess(true);
            loadClientes();
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
