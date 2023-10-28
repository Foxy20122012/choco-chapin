export { default } from 'next-auth/middleware'

export const config = {

  matcher: [
    '/api/:path*',
    '/nota',
    '/materiaPrima',
    '/salidasMateriasPrimas',
    '/clientes',
    '/ventas',
    '/pedidos',
    '/planilla'
  ]
}
