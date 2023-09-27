import React, { FC } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white w-1/3 p-4 rounded-lg shadow-lg z-50">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="my-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 rounded-md"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
