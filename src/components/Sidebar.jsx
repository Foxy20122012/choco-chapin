'use client'

import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { LuFiles } from 'react-icons/lu'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { BsBoxSeam } from 'react-icons/bs'
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'
import { GiPayMoney } from 'react-icons/gi'
import { FiArrowLeft } from 'react-icons/fi'

const Sidebar = () => {
  const sidebarItems = [
    { text: 'Documentación', link: '/', icon: <LuFiles className='m-3 text-xl font-bold' /> },
    { text: 'Inventario', link: '/pedidos', icon: <BsBoxSeam className='m-3 text-xl font-bold' /> },
    { text: 'Clientes', link: '/clientes', icon: <HiOutlineUserGroup className='m-3 text-xl font-bold' /> },
    { text: 'Ventas', link: '/ventas', icon: <GiPayMoney className='m-3 text-xl font-bold' /> },
    { text: 'Gestión Financiera', link: '/nota', icon: <LiaMoneyBillWaveSolid className='m-3 text-xl font-bold' /> },
    { text: 'Cerrar Sección', link: '', icon: <FiArrowLeft className='m-3  text-xl font-bold' /> }
  ]

  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-60 flex-col items-center bg-white py-6 shadow-md">
      <Typography variant="h6" sx={{ mt: '1rem', mb: '2rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80%' }}/>
      <List sx={{ width: '100%' }}>
        {sidebarItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component="a" href={item.link}>
              {item.icon}
              <ListItemText primary={item.text} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Sidebar
