import React, { createContext, useState, useContext } from 'react'
import { type CreateCuentasBancarias, type UpdateCuentasBancarias } from '@/interfaces/CuentasBancarias' // Importa los tipos para CuentasBancarias
import { type CuentasBancarias } from '@prisma/client' // Importa el tipo CuentasBancarias

interface CuentasBancariasContextType {
  cuentasBancarias: CuentasBancarias[]
  loadCuentasBancarias: () => Promise<void>
  createCuentaBancaria: (cuentaBancaria: CreateCuentasBancarias) => Promise<void>
  deleteCuentaBancaria: (id: number) => Promise<void>
  selectedCuentaBancaria: CuentasBancarias | null
  setSelectedCuentaBancaria: (cuentaBancaria: CuentasBancarias | null) => void
  updateCuentaBancaria: (id: number, cuentaBancaria: UpdateCuentasBancarias) => Promise<void>
}

export const CuentasBancariasContext = createContext<CuentasBancariasContextType | undefined>(undefined)

export const useCuentasBancarias = () => {
  const context = useContext(CuentasBancariasContext)
  if (!context) {
    throw new Error('useCuentasBancarias must be used within a CuentasBancariasProvider')
  }
  return context
}

export const CuentasBancariasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cuentasBancarias, setCuentasBancarias] = useState<CuentasBancarias[]>([])
  const [selectedCuentaBancaria, setSelectedCuentaBancaria] = useState<CuentasBancarias | null>(null)

  const loadCuentasBancarias = async () => {
    const res = await fetch('/api/cuentasBancarias') // Asegúrate de tener un endpoint correcto para cargar las cuentas bancarias
    const data = await res.json()
    setCuentasBancarias(data)
  }

  const createCuentaBancaria = async (cuentaBancaria: CreateCuentasBancarias) => {
    const res = await fetch('/api/cuentasBancarias', {
      method: 'POST',
      body: JSON.stringify(cuentaBancaria),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const newCuentaBancaria = await res.json()
    setCuentasBancarias([...cuentasBancarias, newCuentaBancaria])
  }

  const deleteCuentaBancaria = async (id: number) => {
    const res = await fetch('/api/cuentasBancarias/' + id, {
      method: 'DELETE'
    })
    const data = await res.json()
    setCuentasBancarias(cuentasBancarias.filter((cuenta) => cuenta.id !== id))
  }

  const updateCuentaBancaria = async (id: number, cuentaBancaria: UpdateCuentasBancarias) => {
    const res = await fetch('/api/cuentasBancarias/' + id, {
      method: 'PUT',
      body: JSON.stringify(cuentaBancaria),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    setCuentasBancarias(cuentasBancarias.map((cuenta) => (cuenta.id === id ? data : cuenta)))
  }

  return (
    <CuentasBancariasContext.Provider
      value={{
        cuentasBancarias,
        loadCuentasBancarias,
        createCuentaBancaria,
        deleteCuentaBancaria,
        selectedCuentaBancaria,
        setSelectedCuentaBancaria,
        updateCuentaBancaria
      }}
    >
      {children}
    </CuentasBancariasContext.Provider>
  )
}
