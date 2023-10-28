/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.via-asesores.com', 'gt.via-asesores.com', 'qa.via-asesores.com'],
    unoptimized: true // solo para generar sitio estatico
  },
}

module.exports = nextConfig
