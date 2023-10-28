import React, { useState, useEffect } from 'react'
import React, { useState, useEffect, ReactNode } from "react";

interface FormFieldOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface FormField {
  label: string;
  name: string;
  type: "text" | "number" | "select";
  options?: FormFieldOption[];
  required?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
}

interface DynamicFormProps {
  formProps: any[] // Puedes definir un tipo más específico si lo deseas
  onSubmit: (data: any) => void // Agrega un tipo para la función de envío
  showCreateButton: boolean // Propiedad para controlar la visibilidad del botón "Crear"
  showUpdateButton: boolean // Propiedad para controlar la visibilidad del botón "Actualizar"
  initialFormData?: any
  onUpdateClick?: () => void // Nuevo prop para el evento de actualización
  columns?: number // Propiedad para definir el número de columnas (valor predeterminado 1)
  formProps: FormField[];
  onSubmit: (data: any) => void;
  showCreateButton: boolean;
  showUpdateButton: boolean;
  initialFormData?: any;
  onUpdateClick?: () => void;
  columns?: number;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formProps,
  onSubmit,
  showCreateButton,
  showUpdateButton,
  initialFormData,
  onUpdateClick, // Nuevo prop para el evento de actualización
  columns = 1
  onUpdateClick,
  columns = 1,
}) => {
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData)
    }
  }, [initialFormData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Transforma los valores de campos de selección a texto
    const transformedData = { ...formData };
    formProps.forEach((field) => {
      if (field.type === "select") {
        const selectedOption = field.options?.find(
          (option) => option.value === transformedData[field.name]
        );
        transformedData[field.name] = selectedOption ? selectedOption.label : "";
      }
    });

    onSubmit(transformedData);
  };

  return (
    <form className={`max-w-md mx-auto grid grid-cols-${columns}`} onSubmit={handleSubmit}>
      {formProps.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
          <div className="mx-2">
            {field.type === "select" ? (
              <select
                className="border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                name={field.name}
                required={field.required}
                // @ts-ignore
                onChange={handleChange}
                value={formData[field.name] || ""}
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.icon && (
                      <span className="mr-2 inline">{option.icon}</span>
                    )}
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                type={field.type}
                name={field.name}
                required={field.required}
                onChange={handleChange}
                value={formData[field.name] || ""}
                readOnly={field.readOnly}
                maxLength={field.maxLength}
                minLength={field.minLength}
              />
            )}
          </div>
        </div>
      ))}
      {showCreateButton && (
        <button
          className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Crear
        </button>
      )}
      {showUpdateButton && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={onUpdateClick}
        >
          Actualizar
        </button>
      )}
    </form>
  )
}

export default DynamicForm;

