"use client";

import React, { useEffect, useState } from "react";
import { Empleados } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useEmpleados } from "@/context/EmpleadosContext";
import { empleadosColumns } from "@/models/empleadosModel";
import Modal from "@/components/Modal";
import SuccessModal from "@/components/SuccessModal";
import { transformEmpleadosToRows } from "@/models/empleadosModel";
import DynamicForm from "@/components/DynamicForm";
import empleadosProps from "@/models/empleadosProps";
import useHasMounted from "@/hooks/useHasMounted";
import Loading from "@/components/Loading";

import { FaHeart } from "react-icons/fa";

const columns = (Object.keys(empleadosColumns) as (keyof Empleados)[]).map(
  (key) => ({ key, label: empleadosColumns[key] })
);

function EmpleadosPage() {
  const {
    empleados,
    loadEmpleados,
    createEmpleado,
    deleteEmpleado,
    selectedEmpleado,
    setSelectedEmpleado,
    updateEmpleado,
  } = useEmpleados();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [empleadosDelete, setEmpleadosToDelete] = useState<Empleados | null>(
    null
  );
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const rowsEmpleados = transformEmpleadosToRows(empleados);

  useEffect(() => {
    loadEmpleados();
  }, []);

  const openDeleteModal = (empleado: Empleados) => {
    setEmpleadosToDelete(empleado);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setEmpleadosToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditCliente = (empleado: Empleados) => {
    setSelectedEmpleado(empleado);
    setIsFormVisible(true);
  };

  const handleDelete = (empleado: Empleados) => {
    openDeleteModal(empleado);
  };

  const handleNewClick = () => {
    setSelectedEmpleado(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdateCliente = async (formData: any) => {
    try {
      if (selectedEmpleado) {
        // Estás editando un cliente existente
        await updateEmpleado(selectedEmpleado.id, formData);
      } else {
        // Estás creando un nuevo cliente
        await createEmpleado(formData);
      }
      setIsFormVisible(false);
      setSelectedEmpleado(null);
      loadEmpleados();
    } catch (error) {
      console.error("Error al crear o actualizar el Empleado:", error);
    }
  };

  const handleUpdateClick = async (formData: any) => {
    try {
      if (selectedEmpleado) {
        // Estás editando un cliente existente
        await updateEmpleado(selectedEmpleado.id, formData); // Envía los datos actualizados al servidor
      }
      setIsFormVisible(false);
      setSelectedEmpleado(null);
      loadEmpleados();
    } catch (error) {
      console.error("Error al actualizar el Empleado:", error);
    }
  };

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return <Loading />; //<Loadig />
  }
  return (
    <div>
      <div>
        <DataTable
          title={"Empleados"}
          // @ts-ignore
          data={rowsEmpleados}
          columns={columns}
          // @ts-ignore
          onEdit={handleEditCliente}
          // @ts-ignore
          onDelete={handleDelete}
          onNew={handleNewClick}
        />
        <Modal
          isOpen={isDeleteModalOpen}
          title="Confirmar Eliminación"
          message={`¿Estás seguro de que deseas eliminar al Empleado ${empleadosDelete?.nombre}?`}
          onConfirm={async () => {
            try {
              if (empleadosDelete) {
                await deleteEmpleado(empleadosDelete.id);
                closeDeleteModal();
                setIsDeleteSuccess(true);
                loadEmpleados();
              }
            } catch (error) {
              console.error("Error al eliminar el Empleado:", error);
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
          message="El empleado se ha eliminado correctamente."
          buttonText="Aceptar"
        />

        <Modal
          isOpen={isFormVisible}
          title={selectedEmpleado ? "Editar Empleado" : "Nuevo Empleado"}
          onCancel={() => {
            setIsFormVisible(false);
            setSelectedEmpleado(null);
          }}
          showCancelButton={true}
          showConfirmButton={false}
          showUpdateButton={false}
          // @ts-ignore
          onConfirm={handleCreateOrUpdateCliente}
        >
          <DynamicForm
            // @ts-ignore
            formProps={empleadosProps}
            onSubmit={handleCreateOrUpdateCliente}
            showCreateButton={!selectedEmpleado}
            showUpdateButton={!!selectedEmpleado}
            initialFormData={selectedEmpleado}
            // @ts-ignore
            onUpdateClick={handleUpdateClick} // Pasa la función handleUpdateClick al DynamicForm
            columns={1}
          />
        </Modal>

        <div className="flex justify-center items-center"></div>
      </div>
    </div>
  );
}

export default EmpleadosPage;