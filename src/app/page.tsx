"use client";
import { useEffect } from "react";
import { Clientes } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { useClientes } from "@/context/ClientesContext";
import { clientesColumns } from "@/models/clientesModel";

const columns = (Object.keys(clientesColumns) as (keyof Clientes)[]).map(
  (key) => ({ key, label: clientesColumns[key] })
);

function HomePage() {
  const { clientes, loadClientes } = useClientes(); // Asegúrate de usar el contexto correcto

  useEffect(() => {
    loadClientes(); // Carga los clientes desde la base de datos cuando el componente se monta
  }, []);
  return (
    <div>
    <DataTable
  title={"Clientes"}
  data={clientes}
  columns={columns}
  onEdit={(row) => {
    // Implementa la lógica para editar la fila aquí
    console.log("Editar fila:", row);
  }}
  onDelete={(row) => {
    // Implementa la lógica para eliminar la fila aquí
    console.log("Eliminar fila:", row);
  }}
/>
    </div>
  );
}

export default HomePage;
