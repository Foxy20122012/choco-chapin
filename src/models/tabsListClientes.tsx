import { FaHome, FaUser } from "react-icons/fa";
import {GrConfigure } from "react-icons/gr";


const tabContent = [
    {
      label: "Inicio",
      icon: <FaHome />,
      content: (
        <div>
          Texto 1 de prueba
        </div>
      ),
    },
    {
      label: "Perfil",
      icon: <FaUser />,
      content: (
        <div>
          Texto 2 de prueba
        </div>
      ),
    },
    {
      label: "Configuración",
      icon: <GrConfigure />,
      content: (
        <div>
          Texto 3 de prueba desde un Modelo.
        </div>
      ),
    },
  ];

  export default tabContent;