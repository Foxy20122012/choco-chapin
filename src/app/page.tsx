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

  const { clientes,createCliente, loadClientes, updateCliente, deleteCliente } = useClientes(); // Asegúrate de usar el contexto correcto
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

  
  // const handleCreateCliente = (data: any) => {
  //   // Implementa la lógica para crear un nuevo cliente aquí
  //   // data contendrá los valores del formulario
  //   // Puedes usar la función createCliente para enviar los datos al servidor
  // };

  const handleCreateCliente = async (data: any) => {
    // Implementa la lógica para crear un nuevo cliente aquí
    try {
      await createCliente(data); // Llama a la función createCliente con los datos del formulario
      setIsFormVisible(false); // Oculta el formulario después de crear el cliente
      loadClientes(); // Vuelve a cargar los clientes para mostrar el nuevo cliente
    } catch (error) {
      console.error("Error al crear el cliente:", error);
    }
  };
  
  const handleDelete = (cliente: Clientes) => {
    openDeleteModal(cliente);
  };

  const [isFormVisible, setIsFormVisible] = useState(false); // Agrega este estado

  // ...

  const handleNewClick = () => {
    // Cuando se haga clic en "Nuevo", muestra el formulario
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

      {/* Renderiza el formulario dinámico */}
      <DynamicForm formProps={clientesProps} onSubmit={handleCreateCliente} />
    </div>
  );
}

export default HomePage;
