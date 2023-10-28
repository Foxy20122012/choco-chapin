import { createContext, useState, useContext } from "react";
import { CreateUsuarios, UpdateUsuarios } from "@/interfaces/Usuarios"; // Importa los tipos para Usuarios
import { Usuarios } from "@prisma/client"; // Importa el tipo Usuarios

export const UsuariosContext = createContext<{
  usuarios: Usuarios[];
  loadUsuarios: () => Promise<void>;
  createUsuario: (usuario: CreateUsuarios) => Promise<void>;
  deleteUsuario: (id: number) => Promise<void>;
  selectedUsuario: Usuarios | null;
  setSelectedUsuario: (usuario: Usuarios | null) => void;
  updateUsuario: (id: number, usuario: UpdateUsuarios) => Promise<void>;
}>({
  usuarios: [],
  loadUsuarios: async () => {},
  createUsuario: async (usuario: CreateUsuarios) => {},
  deleteUsuario: async (id: number) => {},
  selectedUsuario: null,
  setSelectedUsuario: (usuario: Usuarios | null) => {},
  updateUsuario: async (id: number, usuario: UpdateUsuarios) => {},
});

export const useUsuarios = () => {
  const context = useContext(UsuariosContext);
  if (!context) {
    throw new Error("useUsuarios must be used within a UsuariosProvider");
  }
  return context;
};

export const UsuariosProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuarios | null>(null);

  async function loadUsuarios() {
    // Realiza una solicitud a tu endpoint de API de usuarios
    const res = await fetch("/api/usuarios");
    const data = await res.json();
    setUsuarios(data);
  }

  async function createUsuario(usuario: CreateUsuarios) {
    const res = await fetch("/api/usuarios", {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newUsuario = await res.json();
    setUsuarios([...usuarios, newUsuario]);
  }

  async function deleteUsuario(id: number) {
    const res = await fetch("/api/usuarios/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  }

  async function updateUsuario(id: number, usuario: UpdateUsuarios) {
    const res = await fetch("/api/usuarios/" + id, {
      method: "PUT",
      body: JSON.stringify(usuario),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUsuarios(usuarios.map((usuario) => (usuario.id === id ? data : usuario)));
  }

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        loadUsuarios,
        createUsuario,
        deleteUsuario,
        selectedUsuario,
        setSelectedUsuario,
        updateUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

