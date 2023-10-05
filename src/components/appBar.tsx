'use client'

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlinePicRight } from 'react-icons/ai'
import Sidebar from './sidebar' // Ajusta la ruta de importación según la estructura de tu proyecto

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true)

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      {showSidebar && <Sidebar />}

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, ml: showSidebar ? 30 : 0 }}>
        {/* AppBar */}
        <AppBar sx={{ backgroundColor: '#89CFF0', color: 'black', position: 'fixed', zIndex: 10, width: '100%' }}>
          <Toolbar>
            <Button color="inherit" onClick={handleToggleSidebar}>
              <AiOutlinePicRight className="text-2xl" />
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Choco Chapin
            </Typography>
            <Button color="inherit">
              <BiUserCircle size={24} style={{ marginRight: '16px' }} />
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  )
}

export default MainLayout
