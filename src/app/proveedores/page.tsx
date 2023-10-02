// En otro archivo donde uses las columnas
"use client";
import { useEffect, useState } from "react";
import { Proveedores } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useProveedores } from "@/context/ProveedoresContext";
import {
  proveedoresColumns,
  transformProveedoresToRows,
} from "@/models/proveedoresModel";
import Modal from "@/components/Modal";
import SuccessModal from "@/components/SuccessModal";
import DynamicForm from "@/components/DynamicForm";
import proveedoresProps from "@/models/proveedoresProps";
import useHasMounted from '@/hooks/useHasMounted';
import Loadig from '@/components/Loading';


const columns = (Object.keys(proveedoresColumns) as (keyof Proveedores)[]).map(
  (key) => ({ key, label: proveedoresColumns[key] })
);

function Proveedores() {
  const {
    proveedores,
    loadProveedores,
    createProveedores,
    deleteProveedores,
    selectedProveedores,
    setSelectedProveedores,
    updateProveedores,
  } = useProveedores();

  useEffect(() => {
    loadProveedores(); // Carga los clientes desde la base de datos cuando el componente se monta
  }, []);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [proveedorToDelete, setProveedoresToDelete] = useState<Proveedores | null>(
    null
  );
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const openDeleteModal = (proveedor: Proveedores) => {
    setProveedoresToDelete(proveedor);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProveedoresToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditProveedores = (proveedor: Proveedores) => {
    setSelectedProveedores(proveedor);
    setIsFormVisible(true);
  };

  const handleDelete = (proveedor: Proveedores) => {
    openDeleteModal(proveedor);
  };

  const handleNewClick = () => {
    setSelectedProveedores(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdateProveedores = async (formData: any) => {
    try {
      if (selectedProveedores) {
        // Estás editando un cliente existente
        await updateProveedores(selectedProveedores.id, formData);
      } else {
        // Estás creando un nuevo cliente
        await createProveedores(formData);
      }
      setIsFormVisible(false);
      setSelectedProveedores(null);
      loadProveedores();
    } catch (error) {
      console.error("Error al crear o actualizar el cliente:", error);
    }
  };

  const handleUpdateClick = async (formData: any) => {
    try {
      if (selectedProveedores) {
        // Estás editando un cliente existente
        await updateProveedores(selectedProveedores.id, formData); // Envía los datos actualizados al servidor
      }
      setIsFormVisible(false);
      setSelectedProveedores(null);
      loadProveedores();
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  const rowsProveedores = transformProveedoresToRows(proveedores);

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return<Loadig />;
  }
  return (
    <div>
      <DataTable
        title={"Proveedores"}
         // @ts-ignore
        data={rowsProveedores}
        columns={columns}
        onEdit={handleEditProveedores}
         // @ts-ignore
        onDelete={handleDelete}
        onNew={handleNewClick}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar al cliente ${proveedorToDelete?.nombre}?`}
        onConfirm={async () => {
          try {
            if (proveedorToDelete) {
              await deleteProveedores(proveedorToDelete.id);
              closeDeleteModal();
              setIsDeleteSuccess(true);
              loadProveedores();
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
        message="El Proveedor se ha eliminado correctamente."
        buttonText="Aceptar"
      />
      <Modal
        isOpen={isFormVisible}
        title={selectedProveedores ? "Editar Proveedor" : "Nueva Proveedor"}
        onCancel={() => {
          setIsFormVisible(false);
          setSelectedProveedores(null);
        }}
        showCancelButton={true}
        showConfirmButton={false}
        showUpdateButton={false}
         // @ts-ignore
        onConfirm={handleCreateOrUpdateProveedores}
      >
        <DynamicForm
          formProps={proveedoresProps}
          onSubmit={handleCreateOrUpdateProveedores}
          showCreateButton={!selectedProveedores}
          showUpdateButton={!!selectedProveedores}
          initialFormData={selectedProveedores} // @ts-ignore
          onUpdateClick={handleUpdateClick} // Pasa la función handleUpdateClick al DynamicForm
          columns={1}
          
        />
      </Modal>
    </div>
  );
}

export default Proveedores;
