// AllContexts.js
import React from 'react'
import { NotesProvider } from '@/context/NoteContext'
import { VentasProvider } from '@/context/VentasContext'
import { ClientesProvider } from '@/context/ClientesContext'
import { FacturasProvider } from '@/context/FacturasContext'
import { MateriasPrimasProvider } from '@/context/MateriasPrimasContext'
import { PedidosProvider } from '@/context/PedidosContext'
import { ProductosTerminadosProvider } from '@/context/ProductosTerminadosContext'
import { ProveedoresProvider } from '@/context/ProveedoresContext'
import { SalidasMateriasPrimasProvider } from '@/context/SalidasMateriasPrimasContext'
import { TransaccionesFinancierasProvider } from '@/context/TransaccionesFinancierasContext'
import { EmpleadosProvider } from './EmpleadosContext'
import { CostosProduccionProvider } from '@/context/CostosProduccionContext'
import { SessionProvider } from 'next-auth/react'

const AllContexts = ({ children }: { children: React.ReactNode }) => (
  <NotesProvider>
    <VentasProvider>
      <ClientesProvider>
        <FacturasProvider>
          <MateriasPrimasProvider>
            <PedidosProvider>
              <ProductosTerminadosProvider>
                <ProveedoresProvider>
                  <SalidasMateriasPrimasProvider>
                    <TransaccionesFinancierasProvider>
                      <EmpleadosProvider>
                        <CostosProduccionProvider>
                          <SessionProvider>{children}</SessionProvider>
                        </CostosProduccionProvider>
                      </EmpleadosProvider>
                    </TransaccionesFinancierasProvider>
                  </SalidasMateriasPrimasProvider>
                </ProveedoresProvider>
              </ProductosTerminadosProvider>
            </PedidosProvider>
          </MateriasPrimasProvider>
        </FacturasProvider>
      </ClientesProvider>
    </VentasProvider>
  </NotesProvider>
)

export default AllContexts
