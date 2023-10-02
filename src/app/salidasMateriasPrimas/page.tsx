// En otro archivo donde uses las columnas
"use client";
import { useEffect, useState } from "react";
import { SalidasMateriasPrimas } from "@prisma/client";
import DataTable from "@/components/DataTable";
import {  useSalidasMateriasPrimas } from "@/context/SalidasMateriasPrimasContext";
import {
  salidasMateriasPrimasColumns,
  transformSalidasMateriasPrimasToRows,
} from "@/models/salidaMateriasPrimasModel";
import Modal from "@/components/Modal";
import SuccessModal from "@/components/SuccessModal";
import DynamicForm from "@/components/DynamicForm";
import salidaMateriasPrimasProps from "@/models/salidaMateriasPrimasProps";
import useHasMounted from '@/hooks/useHasMounted';
import Loadig from '@/components/Loading';

const columns = (Object.keys(salidasMateriasPrimasColumns) as (keyof SalidasMateriasPrimas)[]).map(
  (key) => ({ key, label: salidasMateriasPrimasColumns[key] })
);

function SalidasMateriasPrimas() {
  const {
    salidasMateriasPrimas,
    loadSalidasMateriasPrimas,
    createSalidasMateriasPrimas,
    deleteSalidasMateriasPrimas,
    selectedSalidasMateriasPrimas,
    setSelectedSalidasMateriasPrimas,
    updateSalidasMateriasPrimas,
  } = useSalidasMateriasPrimas();

  useEffect(() => {
    loadSalidasMateriasPrimas(); // Carga los clientes desde la base de datos cuando el componente se monta
  }, []);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [salidaMateriasPrimasToDelete, setSalidasMateriasPrimasToDelete] = useState<SalidasMateriasPrimas | null>(
    null
  );
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const openDeleteModal = (salidaMateriaPrima: SalidasMateriasPrimas) => {
    setSalidasMateriasPrimasToDelete(salidaMateriaPrima);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSalidasMateriasPrimasToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditSalidasMateriasPrimas = (salidaMateriaPrima: SalidasMateriasPrimas) => {
    setSelectedSalidasMateriasPrimas(salidaMateriaPrima);
    setIsFormVisible(true);
  };

  const handleDelete = (salidaMateriaPrima: SalidasMateriasPrimas) => {
    openDeleteModal(salidaMateriaPrima);
  };

  const handleNewClick = () => {
    setSelectedSalidasMateriasPrimas(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdateSalidasMateriasPrimas = async (formData: any) => {
    try {
      if (selectedSalidasMateriasPrimas) {
        // Estás editando un cliente existente
        await updateSalidasMateriasPrimas(selectedSalidasMateriasPrimas.id, formData);
      } else {
        // Estás creando un nuevo cliente
        await createSalidasMateriasPrimas(formData);
      }
      setIsFormVisible(false);
      setSelectedSalidasMateriasPrimas(null);
      loadSalidasMateriasPrimas();
    } catch (error) {
      console.error("Error al crear o actualizar la salida de materia prima:", error);
    }
  };

  const handleUpdateClick = async (formData: any) => {
    try {
      if (selectedSalidasMateriasPrimas) {
        // Estás editando un cliente existente
        await updateSalidasMateriasPrimas(selectedSalidasMateriasPrimas.id, formData); // Envía los datos actualizados al servidor
      }
      setIsFormVisible(false);
      setSelectedSalidasMateriasPrimas(null);
      loadSalidasMateriasPrimas();
    } catch (error) {
      console.error("Error al actualizar la salida de la materia prima:", error);
    }
  };

  const rowsSalidasMateriasPrimas = transformSalidasMateriasPrimasToRows(salidasMateriasPrimas);

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return<Loadig />;
  }
  return (
    <div>
      <DataTable
        title={"Salidas De Materias Primas"}
         // @ts-ignore
        data={rowsSalidasMateriasPrimas}
        columns={columns}
         // @ts-ignore
        onEdit={handleEditSalidasMateriasPrimas}
         // @ts-ignore
        onDelete={handleDelete}
        onNew={handleNewClick}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar la salida de la materia prima ${salidaMateriasPrimasToDelete?.materia_prima_id}?`}
        onConfirm={async () => {
          try {
            if (salidaMateriasPrimasToDelete) {
              await deleteSalidasMateriasPrimas(salidaMateriasPrimasToDelete.id);
              closeDeleteModal();
              setIsDeleteSuccess(true);
              loadSalidasMateriasPrimas();
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
        message="La materia prima se ha eliminado correctamente."
        buttonText="Aceptar"
      />
      <Modal
        isOpen={isFormVisible}
        title={selectedSalidasMateriasPrimas ? "Editar Salida De Materia Prima" : "Nueva Salida De Materia Prima"}
        onCancel={() => {
          setIsFormVisible(false);
          setSelectedSalidasMateriasPrimas(null);
        }}
        showCancelButton={true}
        showConfirmButton={false}
        showUpdateButton={false}
         // @ts-ignore
        onConfirm={handleCreateOrUpdateSalidasMateriasPrimas}
      >
        <DynamicForm
          formProps={salidaMateriasPrimasProps}
          onSubmit={handleCreateOrUpdateSalidasMateriasPrimas}
          showCreateButton={!selectedSalidasMateriasPrimas}
          showUpdateButton={!!selectedSalidasMateriasPrimas}
          initialFormData={selectedSalidasMateriasPrimas}
           // @ts-ignore
          onUpdateClick={handleUpdateClick} // Pasa la función handleUpdateClick al DynamicForm
          columns={2}
          
        />
      </Modal>
    </div>
  );
}

export default SalidasMateriasPrimas;
