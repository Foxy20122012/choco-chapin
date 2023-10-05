// RootLayout.js
'use client'
// RootLayout.js
import React from 'react';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { NotesProvider } from "@/context/NoteContext";
import { VentasProvider } from "@/context/VentasContext";
import { ClientesProvider } from "@/context/ClientesContext";
import { FacturasProvider } from "@/context/FacturasContext";
import { MateriasPrimasProvider } from "@/context/MateriasPrimasContext";
import { PedidosProvider } from "@/context/PedidosContext";
import { ProductosTerminadosProvider } from "@/context/ProductosTerminadosContext";
import { ProveedoresProvider } from "@/context/ProveedoresContext";
import { SalidasMateriasPrimasProvider } from "@/context/SalidasMateriasPrimasContext";
import { TransaccionesFinancierasProvider } from "@/context/TransaccionesFinancierasContext";
import BtnAppBar from '@/components/appBar';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="flex  md:my-12 md:ml-4">
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
                           
                              
                              
                              <BtnAppBar  />
                                {children}
                            
                        
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
        </div>
      </body>
    </html>
  );
}
