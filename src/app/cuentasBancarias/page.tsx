'use client'
import React, { useEffect, useState } from "react";
import { CuentasBancarias } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useCuentasBancarias } from "@/context/CuentasBancariasContext";
import { cuentasBancariasColumns } from "@/models/cuentasBancariasModel"; // Asegúrate de importar las columnas adecuadas
import Modal from "@/components/Modal";
import SuccessModal from "@/components/SuccessModal";
import { transformCuentasBancariasToRows } from "@/models/cuentasBancariasModel"; // Asegúrate de importar la función adecuada
import DynamicForm from "@/components/DynamicForm";
import cuentasBancariasProps from "@/models/cuentasBancariasProps"; // Asegúrate de importar las props adecuadas
import useHasMounted from "@/hooks/useHasMounted";
import Loading from "@/components/Loading";
import CountTag from "@/components/CountTag";
import { FaHeart } from "react-icons/fa";
import CustomTabs from "@/components/CustomTabs";
// import tabContent from "@/models/tabsListCuentasBancarias"; // Asegúrate de importar las pestañas adecuadas

const columns = (Object.keys(cuentasBancariasColumns) as (keyof CuentasBancarias)[]).map(
  (key) => ({ key, label: cuentasBancariasColumns[key] })
);

function CuentasBancariasPage() {
  const {
    cuentasBancarias,
    createCuentaBancaria,
    loadCuentasBancarias,
    deleteCuentaBancaria,
    selectedCuentaBancaria,
    setSelectedCuentaBancaria,
    updateCuentaBancaria,
  } = useCuentasBancarias();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [cuentaToDelete, setCuentaToDelete] = useState<CuentasBancarias | null>(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const rowsCuentasBancarias = transformCuentasBancariasToRows(cuentasBancarias);

  useEffect(() => {
    loadCuentasBancarias();
  }, []);

  const openDeleteModal = (cuenta: CuentasBancarias) => {
    setCuentaToDelete(cuenta);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setCuentaToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditCuentaBancaria = (cuenta: CuentasBancarias) => {
    setSelectedCuentaBancaria(cuenta);
    setIsFormVisible(true);
  };

  const handleDelete = (cuenta: CuentasBancarias) => {
    openDeleteModal(cuenta);
  };

  const handleNewClick = () => {
    setSelectedCuentaBancaria(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdateCuentaBancaria = async (formData: any) => {
    try {
      if (selectedCuentaBancaria) {
        // Estás editando una cuenta bancaria existente
        await updateCuentaBancaria(selectedCuentaBancaria.id, formData);
      } else {
        // Estás creando una nueva cuenta bancaria
        await createCuentaBancaria(formData);
      }
      setIsFormVisible(false);
      setSelectedCuentaBancaria(null);
      loadCuentasBancarias();
    } catch (error) {
      console.error("Error al crear o actualizar la cuenta bancaria:", error);
    }
  };

  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return <Loading />;
  }
  return (
    <div>
      <div>
        <DataTable
          title={"Cuentas Bancarias"}
          data={rowsCuentasBancarias}
          columns={columns}
          onEdit={handleEditCuentaBancaria}
          onDelete={handleDelete}
          onNew={handleNewClick}
        />
        <Modal
          isOpen={isDeleteModalOpen}
          title="Confirmar Eliminación"
          message={`¿Estás seguro de que deseas eliminar la cuenta bancaria ${cuentaToDelete?.nombre}?`}
          onConfirm={async () => {
            try {
              if (cuentaToDelete) {
                await deleteCuentaBancaria(cuentaToDelete.id);
                closeDeleteModal();
                setIsDeleteSuccess(true);
                loadCuentasBancarias();
              }
            } catch (error) {
              console.error("Error al eliminar la cuenta bancaria:", error);
            }
          }}
          onCancel={closeDeleteModal}
          onUpdate={handleCreateOrUpdateCuentaBancaria}
          showUpdateButton={false}
          showConfirmButton={true}
        />
        <SuccessModal
          isOpen={isDeleteSuccess}
          onClose={() => setIsDeleteSuccess(false)}
          message="La cuenta bancaria se ha eliminado correctamente."
          buttonText="Aceptar"
        />

        <Modal
          isOpen={isFormVisible}
          title={selectedCuentaBancaria ? "Editar Cuenta Bancaria" : "Nueva Cuenta Bancaria"}
          onCancel={() => {
            setIsFormVisible(false);
            setSelectedCuentaBancaria(null);
          }}
          showCancelButton={true}
          showConfirmButton={false}
          showUpdateButton={false}
          onConfirm={handleCreateOrUpdateCuentaBancaria}
        >
          <DynamicForm
            formProps={cuentasBancariasProps}
            onSubmit={handleCreateOrUpdateCuentaBancaria}
            showCreateButton={!selectedCuentaBancaria}
            showUpdateButton={!!selectedCuentaBancaria}
            initialFormData={selectedCuentaBancaria}
            onUpdateClick={handleCreateOrUpdateCuentaBancaria}
            columns={2}
          />
        </Modal>

        <CountTag
          datos="Ventas totales"
          icon={<FaHeart />}
          value={12500}
          theme="green"
          title="Resumen de ventas"
        />

        <div className="flex justify-center items-center">
          {/* <CustomTabs tabs={tabContent} /> */}
        </div>
      </div>
    </div>
  );
}

export default CuentasBancariasPage;
