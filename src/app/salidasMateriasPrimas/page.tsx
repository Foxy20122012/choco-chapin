// En otro archivo donde uses las columnas
'use client'
import { useEffect } from "react";
import { Facturas } from "@prisma/client";
import DataTable from "@/components/DataTable";
import  { useFacturas } from "@/context/FacturasContext"
import { facturasColumns } from "@/models/facturasModel";

const columns = (Object.keys(facturasColumns) as (keyof Facturas)[]).map(key => ({ key, label: facturasColumns[key] }));



function SalidasMateriasPage() {
  const { facturas, loadFacturas } = useFacturas(); // Asegúrate de usar el contexto correcto

  useEffect(() => {
    loadFacturas(); // Carga los clientes desde la base de datos cuando el componente se monta
  }, []);
  return (
    <div>
      <DataTable title={"facturas"} data={facturas} columns={columns} />
    </div>
  );
}

export default SalidasMateriasPage;
