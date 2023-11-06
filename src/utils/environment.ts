const environment = {
  setEnvUser: async (user) => {
    localStorage.setItem(`${process.env.idApp}/${process.env.NODE_ENV}`, user)
  },
  getEnvUser: async () => {
    return await new Promise((resolve, reject) => {
      const user = localStorage.getItem(`${process.env.idApp}/${process.env.NODE_ENV}`)
      resolve(user)
    })
  },
  logout: async () => {
    return await new Promise((resolve, reject) => {
      localStorage.removeItem(`${process.env.idApp}/${process.env.NODE_ENV}`)
      resolve('/login')
    })
  }
}

export default environment
