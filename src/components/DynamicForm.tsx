// DynamicForm.tsx
import React from "react";

interface DynamicFormProps {
  formProps: any[]; // Puedes definir un tipo más específico si lo deseas
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formProps }) => {
  return (
    <form>
      {formProps.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          {field.type === "text" && (
            <input
              type="text"
              name={field.name}
              required={field.required}
              // Agrega más atributos según tus necesidades
            />
          )}
          {/* Agrega más tipos de campos según tus necesidades */}
        </div>
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default DynamicForm;
