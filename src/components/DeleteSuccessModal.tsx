import React, { FC } from "react";

interface DeleteSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonText: string;
}

const DeleteSuccessModal: FC<DeleteSuccessModalProps> = ({ isOpen, onClose, message, buttonText }) => {

return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={onClose}></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Éxito</p>
            <button onClick={onClose} className="modal-close cursor-pointer z-50">
              <span className="text-3xl">&times;</span>
            </button>
          </div>
          <p>{message}</p>
          <div className="mt-4">
            <button onClick={onClose} className="modal-close bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteSuccessModal;
