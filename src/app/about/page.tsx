// En otro archivo donde uses las columnas
'use client'
import { Clientes } from "@prisma/client";
import DataTable from "@/components/DataTable";
import { clientesColumns } from "@/models/clientesModel";

const columns = (Object.keys(clientesColumns) as (keyof Clientes)[]).map(key => ({ key, label: clientesColumns[key] }));

const data = [
  {
    id: 1,
    nombre: "John Doe",
    direccion: "123 Main St",
    telefono: "555-1234",
    correo_electronico: "john@example.com",
    fecha_registro: "2023-01-15",
    historial_compras: "Compras anteriores...",
  },
  {
    id: 1,
    nombre: "John Doe",
    direccion: "123 Main St",
    telefono: "555-1234",
    correo_electronico: "john@example.com",
    fecha_registro: "2023-01-15",
    historial_compras: "Compras anteriores...",
  },
  {
    id: 1,
    nombre: "John Doe",
    direccion: "123 Main St",
    telefono: "555-1234",
    correo_electronico: "john@example.com",
    fecha_registro: "2023-01-15",
    historial_compras: "Compras anteriores...",
  },
  {
    id: 1,
    nombre: "John Doe",
    direccion: "123 Main St",
    telefono: "555-1234",
    correo_electronico: "john@example.com",
    fecha_registro: "2023-01-15",
    historial_compras: "Compras anteriores...",
  },
  {
    id: 1,
    nombre: "John Doe",
    direccion: "123 Main St",
    telefono: "555-1234",
    correo_electronico: "john@example.com",
    fecha_registro: "2023-01-15",
    historial_compras: "Compras anteriores...",
  },
  {
    id: 1,
    nombre: "John Doe",
    direccion: "123 Main St",
    telefono: "555-1234",
    correo_electronico: "john@example.com",
    fecha_registro: "2023-01-15",
    historial_compras: "Compras anteriores...",
  },
  // Agrega más filas según tus datos
];

function App() {
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default App;
