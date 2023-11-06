import { createContext, useState, useContext } from 'react'
import { type CreateClientes, type UpdateClientes } from '@/interfaces/Clientes' // Importa los tipos para Clientes
import { type Clientes } from '@prisma/client' // Importa el tipo Cliente

export const ClientesContext = createContext<{
  clientes: Clientes[]
  loadClientes: () => Promise<void>
  createCliente: (cliente: CreateClientes) => Promise<void>
  deleteCliente: (id: number) => Promise<void>
  selectedCliente: Clientes | null
  setSelectedCliente: (cliente: Clientes | null) => void
  updateCliente: (id: number, cliente: UpdateClientes) => Promise<void>
}>({
      clientes: [],
      loadClientes: async () => {},
      createCliente: async (cliente: CreateClientes) => {},
      deleteCliente: async (id: number) => {},
      selectedCliente: null,
      setSelectedCliente: (cliente: Clientes | null) => {},
      updateCliente: async (id: number, cliente: UpdateClientes) => {}
    })

export const useClientes = () => {
  const context = useContext(ClientesContext)
  if (!context) {
    throw new Error('useClientes must be used within a ClientesProvider')
  }
  return context
}

export const ClientesProvider = ({ children }: { children: React.ReactNode }) => {
  const [clientes, setClientes] = useState<Clientes[]>([])
  const [selectedCliente, setSelectedCliente] = useState<Clientes | null>(null)

  async function loadClientes () {
    const res = await fetch('/api/clientes') // Asegúrate de tener un endpoint correcto para cargar los clientes
    const data = await res.json()
    setClientes(data)
  }

  async function createCliente (cliente: CreateClientes) {
    const res = await fetch('/api/clientes', {
      method: 'POST',
      body: JSON.stringify(cliente),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const newCliente = await res.json()
    setClientes([...clientes, newCliente])
  }

  async function deleteCliente (id: number) {
    const res = await fetch('/api/clientes/' + id, {
      method: 'DELETE'
    })
    const data = await res.json()
    setClientes(clientes.filter((cliente) => cliente.id !== id))
  }

  async function updateCliente (id: number, cliente: UpdateClientes) {
    const res = await fetch('/api/clientes/' + id, {
      method: 'PUT',
      body: JSON.stringify(cliente),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    setClientes(clientes.map((cliente) => (cliente.id === id ? data : cliente)))
  }

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        loadClientes,
        createCliente,
        deleteCliente,
        selectedCliente,
        setSelectedCliente,
        updateCliente
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};


