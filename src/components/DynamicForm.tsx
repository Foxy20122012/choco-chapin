import React, { useState,useEffect } from "react";

interface DynamicFormProps {
  formProps: any[]; // Puedes definir un tipo más específico si lo deseas
  onSubmit: (data: any) => void; // Agrega un tipo para la función de envío
  showCreateButton: boolean; // Propiedad para controlar la visibilidad del botón "Crear"
  showUpdateButton: boolean; // Propiedad para controlar la visibilidad del botón "Actualizar"
  initialFormData?: any;
}


const DynamicForm: React.FC<DynamicFormProps> = ({ formProps, onSubmit,showCreateButton, showUpdateButton, initialFormData }) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    // Actualiza el formData cuando initialFormData cambie
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData); // Llama a la función onSubmit con los datos del formulario
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
    {formProps.map((field) => (
      <div key={field.name} className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {field.label}
        </label>
        <input
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type={field.type}
          name={field.name}
          required={field.required}
          onChange={handleChange}
          value={formData[field.name] || ""}
          readOnly={field.readOnly}
          maxLength={field.maxLength}
          minLength={field.minLength}
          // Agrega más atributos según tus necesidades
        />
      </div>
    ))}
    {showCreateButton && (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Crear
      </button>
    )}
    {showUpdateButton && (
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Actualizar
      </button>
    )}
  </form>
  );
};

export default DynamicForm;
