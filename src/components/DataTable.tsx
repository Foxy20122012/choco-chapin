import React, { useState, useEffect, FC } from "react";
// import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Clientes } from "@/models/clientesModel"; // Asegúrate de que la ruta sea correcta

interface Column {
  key: string;
  label: string;
}

interface Row {
  [key: string]: string | number | boolean | Date;
}

interface DataTableProps {
  data: Clientes[]; // Cambiar 'Row' a 'Clientes[]'
  title: string;
  columns: Column[];
  itemsPerPageOptions?: number[];
  onEdit: (row: Row) => void;
  onDelete: (row: Clientes) => void; // Cambiar 'Row' a 'Clientes'
  onNew: () => void;
}

const DataTable: FC<DataTableProps> = ({
  data,
  title,
  columns,
  itemsPerPageOptions = [5, 10, 20, 25, 50, 75, 100, 200, 500, 1000],
  onEdit,
  onDelete,
  onNew,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtrar datos por término de búsqueda
  const filteredData = data.filter((row) =>
    columns.some((column) => {
      const cellValue = getColumnValue(row, column.key);
      if (typeof cellValue === "string") {
        return cellValue.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    })
  );

  // Función de acceso a las propiedades segura
  function getColumnValue(obj: any, key: string): any {
    return key.split(".").reduce((o, k) => (o || {})[k], obj);
  }

  const visibleData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="p-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold p-4 bg-[#3fa3d1] text-white">
          {title}
        </h2>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4 ">
            <div className="flex items-center space-x-96 ml-12">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar..."
                className="px-80 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
              />
              <button
                onClick={onNew}
                className="px-4 py-2 bg-[#3fa3d1] hover:bg-[#377c9c] text-white rounded-md"
              >
                Nuevo
              </button>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-300">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-5 text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {column.label}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="px-6 py-5 text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {visibleData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column, columnIndex) => (
                      <td
                        key={columnIndex}
                        className="px-6 py-4 whitespace-nowrap text-center justify-center"
                      >
                        {String(getColumnValue(row, column.key))}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-center justify-center">
                      <button
                        onClick={() => onEdit(row)}
                        className="text-[#3fa3d1] hover:text-[#68c8f4] font-medium"
                      >
                        <BiEdit className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-600 hover:text-red-900 font-medium ml-2"
                      >
                        <MdDelete className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-100">
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Mostrar:</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#3fa3d1] hover:bg-[#58b8e4] text-white"
              } px-4 py-2 rounded-md disabled:opacity-50`}
              aria-label="Anterior"
            >
              Anterior
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#3fa3d1] hover:bg-[#377c9c] text-white"
              } px-4 py-2 rounded-md disabled:opacity-50`}
              aria-label="Siguiente"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;