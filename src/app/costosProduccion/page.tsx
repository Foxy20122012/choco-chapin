"use client";
import React, { useEffect, useState } from "react";
import { CostosProduccion } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useCostosProduccion } from "@/context/CostosProduccionContext";
import { costosProduccionColumns } from "@/models/costosProduccionModel";
import Modal from "@/components/Modal";
import SuccessModal from "@/components/SuccessModal";
import { transformCostosProduccionToRows } from "@/models/costosProduccionModel";
import DynamicForm from "@/components/DynamicForm";
import costosProduccionProps from "@/models/costosProduccionProps";
import useHasMounted from "@/hooks/useHasMounted";
import Loadig from "@/components/Loading";
import CountTag from "@/components/CountTag";
import { FaHeart } from "react-icons/fa";
import CustomTabs from "@/components/CustomTabs";
import tabContent from "@/models/tabsListClientes"


const columns = (Object.keys(costosProduccionColumns) as (keyof CostosProduccion)[]).map(
  (key) => ({ key, label: costosProduccionColumns[key] })
);

function CostosProducccionPage() {
  const {
    costosProduccion,
    loadCostosProduccion,
    createCostosProduccion,
    deleteCostosProduccion,
    selectedCostosProduccion,
    setSelectedCostosProduccion,
    updateCostosProduccion,
  } = useCostosProduccion();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [costosToDelete, setCostosToDelete] = useState<CostosProduccion | null>(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const rowsCostoProduccion = transformCostosProduccionToRows(costosProduccion);

  useEffect(() => {
    loadCostosProduccion();
  }, []);

  const openDeleteModal = (costoProduccion: CostosProduccion) => {
    setCostosToDelete(costoProduccion);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setCostosToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditCliente = (costoProduccion: CostosProduccion) => {
    setSelectedCostosProduccion(costoProduccion);
    setIsFormVisible(true);
  };

  const handleDelete = (costoProduccion: CostosProduccion) => {
    openDeleteModal(costoProduccion);
  };

  const handleNewClick = () => {
    setSelectedCostosProduccion(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdateCliente = async (formData: any) => {
    try {
      if (selectedCostosProduccion) {
        // Estás editando un cliente existente
        await updateCostosProduccion(selectedCostosProduccion.id, formData);
      } else {
        // Estás creando un nuevo cliente
        await createCostosProduccion(formData);
      }
      setIsFormVisible(false);
      setSelectedCostosProduccion(null);
      loadCostosProduccion();
    } catch (error) {
      console.error("Error al crear o actualizar el Costo de la Produccion:", error);
    }
  };

  const handleUpdateClick = async (formData: any) => {
    try {
      if (selectedCostosProduccion) {
        // Estás editando un cliente existente
        await updateCostosProduccion(selectedCostosProduccion.id, formData); // Envía los datos actualizados al servidor
      }
      setIsFormVisible(false);
      setSelectedCostosProduccion(null);
      loadCostosProduccion();
    } catch (error) {
      console.error("Error al actualizar el Costo de la Produccion:", error);
    }
  };

  

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return <Loadig />; //<Loadig />
  }
  return (
    <div>
      <div>
        <DataTable
          title={"Costos Produccion"}
          
          data={rowsCostoProduccion}
          columns={columns}
          onEdit={handleEditCliente}
          onDelete={handleDelete}
          onNew={handleNewClick}
        />
        <Modal
          isOpen={isDeleteModalOpen}
          title="Confirmar Eliminación"
          message={`¿Estás seguro de que deseas eliminar al Costo de la Produccion ${costosToDelete?. nombre_producto  }?`}
          onConfirm={async () => {
            try {
              if (costosToDelete) {
                await deleteCostosProduccion(costosToDelete.id);
                closeDeleteModal();
                setIsDeleteSuccess(true);
                loadCostosProduccion();
              }
            } catch (error) {
              console.error("Error al eliminar el Costo de la Produccion:", error);
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
          message="El Costo de la Produccion se ha eliminado correctamente."
          buttonText="Aceptar"
        />

        <Modal
          isOpen={isFormVisible}
          title={selectedCostosProduccion ? "Editar Costo de la Produccion" : "Nuevo Costo de la Produccion"}
          onCancel={() => {
            setIsFormVisible(false);
            setSelectedCostosProduccion(null);
          }}
          showCancelButton={true}
          showConfirmButton={false}
          showUpdateButton={false}
          // @ts-ignore
          onConfirm={handleCreateOrUpdateCliente}
        >
          <DynamicForm
            formProps={costosProduccionProps}
            onSubmit={handleCreateOrUpdateCliente}
            showCreateButton={!selectedCostosProduccion}
            showUpdateButton={!!selectedCostosProduccion}
            initialFormData={selectedCostosProduccion}
            // @ts-ignore
            onUpdateClick={handleUpdateClick} // Pasa la función handleUpdateClick al DynamicForm
            columns={2}
          />
        </Modal>

        <CountTag
          datos="Costo de la Produccion totales"
          icon={<FaHeart />} // Utiliza el ícono de un corazón de React Icons
          value={12500}
          theme="green"
          title="Resumen de Costo de la Produccion"
        />

        <div className="flex justify-center items-center">
          <CustomTabs tabs={tabContent} />
        </div>
      </div>
    </div>
  );
}

export default CostosProducccionPage;
