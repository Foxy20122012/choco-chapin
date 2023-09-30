// En otro archivo donde uses las columnas
"use client";
import { useEffect, useState } from "react";
import { Proveedores, Ventas } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useVentas } from "@/context/VentasContext";
import {
  ventasColumns,
  transformVentasToRows,
} from "@/models/ventasModel";
import Modal from "@/components/Modal";
import SuccessModal from "@/components/SuccessModal";
import DynamicForm from "@/components/DynamicForm";
import ventasProps from "@/models/ventasProps";
import useHasMounted from '@/hooks/useHasMounted';
import Loadig from '@/components/Loading';

const columns = (Object.keys(ventasColumns) as (keyof Ventas)[]).map(
  (key) => ({ key, label: ventasColumns[key] })
);

function VentasPage() {
  const {
    ventas,
    loadVentas,
    createVentas,
    deleteVentas,
    selectedVentas,
    setSelectedVentas,
    updateVentas,
  } = useVentas();

  useEffect(() => {
    loadVentas(); // Carga los clientes desde la base de datos cuando el componente se monta
  }, []);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [ventasToDelete, setVentasToDelete] = useState<Ventas | null>(
    null
  );
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const openDeleteModal = (venta: Ventas) => {
    setVentasToDelete(venta);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setVentasToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditVentas = (venta: Ventas) => {
    setSelectedVentas(venta);
    setIsFormVisible(true);
  };

  const handleDelete = (venta: Ventas) => {
    openDeleteModal(venta);
  };

  const handleNewClick = () => {
    setSelectedVentas(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdateVentas = async (formData: any) => {
    try {
      if (selectedVentas) {
        // Estás editando un cliente existente
        await updateVentas(selectedVentas.id, formData);
      } else {
        // Estás creando un nuevo cliente
        await createVentas(formData);
      }
      setIsFormVisible(false);
      setSelectedVentas(null);
      loadVentas();
    } catch (error) {
      console.error("Error al crear o actualizar el cliente:", error);
    }
  };

  const handleUpdateClick = async () => {
    try {
      if (selectedVentas) {
        // Estás editando un cliente existente
        await updateVentas(selectedVentas.id, formData); // Envía los datos actualizados al servidor
      }
      setIsFormVisible(false);
      setSelectedVentas(null);
      loadVentas();
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  const rowsVentas = transformVentasToRows(ventas);

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return<Loadig />;
  }
  return (
    <div>
      <DataTable
        title={"Registro De Ventas"}
        data={rowsVentas}
        columns={columns}
        onEdit={handleEditVentas}
        onDelete={handleDelete}
        onNew={handleNewClick}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar al cliente ${ventasToDelete?.cliente_id }?`}
        onConfirm={async () => {
          try {
            if (ventasToDelete) {
              await deleteVentas(ventasToDelete.id);
              closeDeleteModal();
              setIsDeleteSuccess(true);
              loadVentas();
            }
          } catch (error) {
            console.error("Error al eliminar el cliente:", error);
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
        message="El registro de la Venta ha sido eliminado correctamente."
        buttonText="Aceptar"
      />
      <Modal
        isOpen={isFormVisible}
        title={selectedVentas ? "Editar Venta" : "Registrar Nueva Venta"}
        onCancel={() => {
          setIsFormVisible(false);
          setSelectedVentas(null);
        }}
        showCancelButton={true}
        showConfirmButton={false}
        showUpdateButton={false}
        onConfirm={handleCreateOrUpdateVentas}
      >
        <DynamicForm
          formProps={ventasProps}
          onSubmit={handleCreateOrUpdateVentas}
          showCreateButton={!selectedVentas}
          showUpdateButton={!!selectedVentas}
          initialFormData={selectedVentas}
          onUpdateClick={handleUpdateClick} // Pasa la función handleUpdateClick al DynamicForm
          columns={2}
          
        />
      </Modal>
    </div>
  );
}

export default VentasPage;
