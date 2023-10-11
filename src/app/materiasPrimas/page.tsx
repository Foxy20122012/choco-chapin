'use client'
import React, { useEffect, useState } from "react";
import { MateriasPrimas } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useMateriasPrimas } from "@/context/MateriasPrimasContext";
import { materiasPrimasColumns } from "@/models/materiasPrimasModel";
import Modal from "@/components/Modal";
import SuccessModal from "@/components/SuccessModal";
import { transformMateriasPrimasToRows } from "@/models/materiasPrimasModel";
import DynamicForm from "@/components/DynamicForm";
import materiasPrimasProps from "@/models/materiasPrimasProps";
import useHasMounted from "@/hooks/useHasMounted";
import Loading from "@/components/Loading";

const columns = (Object.keys(materiasPrimasColumns) as (keyof MateriasPrimas)[]).map(
  (key) => ({ key, label: materiasPrimasColumns[key] })
);

function MateriasPrimasPage() {
  const {
    materiasPrimas,
    loadMateriasPrimas,
    createMateriasPrimas,
    deleteMateriasPrimas,
    selectedMateriasPrimas,
    setSelectedMateriasPrimas,
    updateMateriasPrimas,
  } = useMateriasPrimas();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [MateriasPrimasToDelete, setMateriasPrimasToDelete] = useState<MateriasPrimas | null>(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    loadMateriasPrimas();
  }, []);

  const openDeleteModal = (materiaPrima: MateriasPrimas) => {
    setMateriasPrimasToDelete(materiaPrima);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setMateriasPrimasToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditMateriasPrimas = (materiaPrima: MateriasPrimas) => {
    setSelectedMateriasPrimas(materiaPrima);
    setIsFormVisible(true);
  };

  const handleDelete = (materiaPrima: MateriasPrimas) => {
    openDeleteModal(materiaPrima);
  };

  const handleNewClick = () => {
    setSelectedMateriasPrimas(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdateMateriasPrimas = async (formData: any) => {
    try {
      if (selectedMateriasPrimas) {
        // Estás editando una materia prima existente
        await updateMateriasPrimas(selectedMateriasPrimas.id, formData);
      } else {
        // Estás creando una nueva materia prima
        await createMateriasPrimas(formData);
      }
      setIsFormVisible(false);
      setSelectedMateriasPrimas(null);
      loadMateriasPrimas();
    } catch (error) {
      console.error("Error al crear o actualizar la materia prima:", error);
    }
  };

  const handleUpdateClick = async (formData: any) => {
    try {
      if (selectedMateriasPrimas) {
        // Estás editando una materia prima existente
        await updateMateriasPrimas(selectedMateriasPrimas.id, formData); // Envía los datos actualizados al servidor
      }
      setIsFormVisible(false);
      setSelectedMateriasPrimas(null);
      loadMateriasPrimas();
    } catch (error) {
      console.error("Error al actualizar la materia prima:", error);
    }
  };

  const rowsMateriasPrimas = transformMateriasPrimasToRows(materiasPrimas);

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return <Loading />;
  }

  return (
    <div>
      <DataTable 
        title={"Materias Primas"}  
        data={rowsMateriasPrimas} 
        columns={columns}
        onEdit={handleEditMateriasPrimas}
        onDelete={handleDelete}
        onNew={handleNewClick}
      />
      <Modal
        isOpen={isDeleteModalOpen} 
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar la Materia Prima ${MateriasPrimasToDelete?.nombre}?`}
        onConfirm={async () => {
          try {
            if (MateriasPrimasToDelete) {
              await deleteMateriasPrimas(MateriasPrimasToDelete.id);
              closeDeleteModal();
              setIsDeleteSuccess(true);
              loadMateriasPrimas();
            }
          } catch (error) {
            console.error("Error al eliminar la materia prima:", error);
          }
        }}
        onCancel={closeDeleteModal}
        onUpdate={handleUpdateClick}
        showUpdateButton={false}
        showConfirmButton={true} 
      />
      <SuccessModal
        isOpen={isDeleteSuccess}
        onClose={() => setIsDeleteSuccess(false)}
        message="La Materia Prima se ha eliminado correctamente."
        buttonText="Aceptar"
      />

      <Modal
        isOpen={isFormVisible}
        title={selectedMateriasPrimas ? "Editar Materia Prima" : "Nueva Materia Prima"}
        onCancel={() => {
          setIsFormVisible(false);
          setSelectedMateriasPrimas(null);
        }}
        showCancelButton={true}
        showConfirmButton={false}
        showUpdateButton={false}
        onConfirm={handleCreateOrUpdateMateriasPrimas}
      >
        <DynamicForm
          formProps={materiasPrimasProps}
          onSubmit={handleCreateOrUpdateMateriasPrimas}
          showCreateButton={!selectedMateriasPrimas}
          showUpdateButton={!!selectedMateriasPrimas}
          initialFormData={selectedMateriasPrimas}
          onUpdateClick={handleUpdateClick} 
          columns={2}
        />
      </Modal>
    </div>
  );
}

export default MateriasPrimasPage;
