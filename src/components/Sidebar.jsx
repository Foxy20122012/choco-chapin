"use client";
"use client";

import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { LuFiles } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsBoxSeam, BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { GiPayMoney, GiMoneyStack } from "react-icons/gi";
import { FiBox, FiArrowLeft } from "react-icons/fi";
import { PiNotePencilFill } from "react-icons/pi";
import { LiaMoneyBillSolid } from "react-icons/lia";
import Collapse from "@mui/material/Collapse";

const Sidebar = () => {
  const [inventoryOpen, setInventoryOpen] = useState(false); // Estado para controlar la apertura del submenú
  const [ventasOpen, setVentasOpen] = useState(false); // Estado para controlar la apertura del submenú de Ventas

  const handleInventoryClick = () => {
    setInventoryOpen(!inventoryOpen)
  }

  const handleVentasClick = () => {
    setVentasOpen(!ventasOpen);
  };

  const sidebarItems = [
    {
      text: 'Usuarios',
      link: '/usuarios',
      icon: <HiOutlineUserGroup className="m-3 text-xl font-bold" />
    },
    {
      text: 'Documentación',
      link: '/',
      icon: <LuFiles className="m-3 text-xl font-bold" />
    },
    {
      text: "Pendientes",
      link: "/nota",
      icon: <PiNotePencilFill className="m-3 text-xl font-bold" />,
    },
    {
      text: "Inventario",
      icon: <BsBoxSeam className="m-3 text-xl font-bold" />,
      onClick: handleInventoryClick
    },
    {
      text: 'Clientes',
      link: '/clientes',
      icon: <HiOutlineUserGroup className="m-3 text-xl font-bold" />
    },
    {
      text: "Ventas",
      icon: <GiMoneyStack className="m-3 text-xl font-bold" />,
      onClick: handleVentasClick,
    },
    {
      text: "Planilla",
      link: "/planilla",
      icon: <BsFileEarmarkSpreadsheet className="m-3 text-xl font-bold" />,
    },
    {
      text: "Gestion Finaciera",
      link: "/facturas",
      icon: <LiaMoneyBillSolid  className="m-3 text-xl font-bold" />,
    },
    {
      text: 'Cerrar Sesión',
      link: '',
      icon: <FiArrowLeft className="m-3  text-xl font-bold" />,
      onClick: doLogout
    }
  ]

  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-60 flex-col items-center bg-white py-6 shadow-md">
      <Typography
        variant="h6"
        sx={{
          mt: '1rem',
          mb: '2rem',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '80%'
        }}
      />
      <List sx={{ width: '100%' }}>
        {sidebarItems.map((item) => (
          <div key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href={item.link}
                onClick={item.onClick}
              >
                {item.icon}
                <ListItemText
                  primary={item.text}
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%'
                  }}
                />
              </ListItemButton>
            </ListItem>
            {/* Renderizar el submenú si el botón de Inventario se ha hecho clic */}
            {item.text === 'Inventario' && (
              <Collapse in={inventoryOpen}>
                {/* Agrega tus opciones de submenú aquí */}
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component="a" href="/materiasPrimas">
                      <BsBoxSeam className="m-3 text-xl font-bold" />
                      Materias Primas
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component="a" href="/salidasMateriasPrimas">
                      <IoIosArrowForward className="m-3 text-xl font-bold" />
                      Entradas y Salidas de Materia Prima
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component="a" href="/productosTerminados">
                      <FiBox className="m-3 text-xl font-bold" />
                      Productos Terminados
                    </ListItemButton>
                  </ListItem>
                  {/* Puedes agregar más opciones de submenú según sea necesario */}
                </List>
              </Collapse>
            )}

            {/* Renderizar el submenú de Ventas si el botón de Ventas se ha hecho clic */}
            {item.text === "Ventas" && (
              <Collapse in={ventasOpen}>
                {/* Agrega tus opciones de submenú de Ventas aquí */}
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component="a" href="/ventas">
                      <GiPayMoney className="m-3 text-xl font-bold" />
                      Ventas
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component="a" href="/pedidos">
                      <FiBox className="m-3 text-xl font-bold" />
                      Pedidos
                    </ListItemButton>
                  </ListItem>
                  {/* Puedes agregar más opciones de submenú de Ventas según sea necesario */}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </div>
  )
}

export default Sidebar;