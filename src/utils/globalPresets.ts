const theme = 'blue'

const presets = {
  theme: `${theme}`,
  appTitle: 'ChocoChapin - ERP',
  images: {
    logo: 'https://media.licdn.com/dms/image/C560BAQHZuM1EcQqr_w/company-logo_200_200/0/1601631775730/m2_pe_logo?e=1706140800&v=beta&t=TV5RerQfY4ZxOdt66MuBSOyX-7uv0l8TKUnqa8a6SRk',
    loginFondo: 'https://recursosparapymes.com/wp-content/uploads/2022/06/mejores-herramientas-planificacion-gratuitas.jpg',
    welcomeFondo: 'https://www.via-asesores.com/backgrounds/smartproject/smartproject_bg02.jpg'
  },
  locations: {
    login: '/login',
    companiasUsuario: '/welcome',
    welcome: '/companiasUsuario',
    profile: '/miPerfil',
    welcomeTemp: '/welcome'
  },
  toaster: {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light'
  }
}

export default presets
