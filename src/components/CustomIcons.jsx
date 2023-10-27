import React from 'react'

// Importa los íconos individuales de react-icons que necesitas
import { FaUser } from 'react-icons/fa'
import { BsGraphUpArrow } from 'react-icons/bs'
import { GrConfigure } from 'react-icons/gr'

const iconComponents = {
  FaUser,
  BsGraphUpArrow,
  GrConfigure
}

const CustomIcon = ({ name, size }) => {
  const IconComponent = iconComponents[name]
  return IconComponent ? <IconComponent size={size} /> : null
}

export default CustomIcon
