// En otro archivo donde uses las columnas
"use client";
import { useEffect, useState } from "react";
import { Facturas } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useFacturas } from "@/context/FacturasContext";
import {
  facturasColumns,
  transformFacturasToRows,
} from "@/models/facturasModel";
import Modal from "@/components/Modal";
import SuccessModal from "@/components/SuccessModal";
import DynamicForm from "@/components/DynamicForm";
import facturasProps from "@/models/facturasProps";
import useHasMounted from '@/hooks/useHasMounted';
import Loadig from '@/components/Loading';

const columns = (Object.keys(facturasColumns) as (keyof Facturas)[]).map(
  (key) => ({ key, label: facturasColumns[key] })
);

function Facturas() {
  const {
    facturas,
    loadFacturas,
    createFacturas,
    deleteFacturas,
    selectedFacturas,
    setSelectedFacturas,
    updateFacturas,
  } = useFacturas();

  useEffect(() => {
    loadFacturas(); // Carga los clientes desde la base de datos cuando el componente se monta
  }, []);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [facturasToDelete, setFacturasToDelete] = useState<Facturas | null>(
    null
  );
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const openDeleteModal = (factura: Facturas) => {
    setFacturasToDelete(factura);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setFacturasToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditFacturas = (factura: Facturas) => {
    setSelectedFacturas(factura);
    setIsFormVisible(true);
  };

  const handleDelete = (factura: Facturas) => {
    openDeleteModal(factura);
  };

  const handleNewClick = () => {
    setSelectedFacturas(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdateFacturas = async (formData: any) => {
    try {
      if (selectedFacturas) {
        // Estás editando un cliente existente
        await updateFacturas(selectedFacturas.id, formData);
      } else {
        // Estás creando un nuevo cliente
        await createFacturas(formData);
      }
      setIsFormVisible(false);
      setSelectedFacturas(null);
      loadFacturas();
    } catch (error) {
      console.error("Error al crear o actualizar el cliente:", error);
    }
  };

  const handleUpdateClick = async () => {
    try {
      if (selectedFacturas) {
        // Estás editando un cliente existente  
        // @ts-ignore
        await updateCliente(selectedFacturas.id, formData); // Envía los datos actualizados al servidor
      }
      setIsFormVisible(false);
      setSelectedFacturas(null);
      loadFacturas();
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  const rowsFacturas = transformFacturasToRows(facturas);

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return<Loadig />;
  }
  return (
    <div>
      <DataTable
        title={"facturas"}
        // @ts-ignore
        data={rowsFacturas}
        columns={columns}
        // @ts-ignore
        onEdit={handleEditFacturas}
        // @ts-ignore
        onDelete={handleDelete}
        onNew={handleNewClick}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar al cliente ${facturasToDelete?.numero_factura}?`}
        onConfirm={async () => {
          try {
            if (facturasToDelete) {
              await deleteFacturas(facturasToDelete.id);
              closeDeleteModal();
              setIsDeleteSuccess(true);
              loadFacturas();
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
        message="La Factura se ha eliminado correctamente."
        buttonText="Aceptar"
      />
      <Modal
        isOpen={isFormVisible}
        title={selectedFacturas ? "Editar Factura" : "Nueva Factura"}
        onCancel={() => {
          setIsFormVisible(false);
          setSelectedFacturas(null);
        }}
        showCancelButton={true}
        showConfirmButton={false}
        showUpdateButton={false}
        // @ts-ignore
        onConfirm={handleCreateOrUpdateFacturas}
      >
        <DynamicForm
        
          formProps={facturasProps}
          onSubmit={handleCreateOrUpdateFacturas}
          showCreateButton={!selectedFacturas}
          showUpdateButton={!!selectedFacturas}
          initialFormData={selectedFacturas}
          onUpdateClick={handleUpdateClick} // Pasa la función handleUpdateClick al DynamicForm
          columns={2}
          // @ts-ignore
          decimalPlaces={3}
        />
      </Modal>
    </div>
  );
}

export default Facturas;
