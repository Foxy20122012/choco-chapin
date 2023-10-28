import NextAuth from 'next-auth'
import { PrismaClient } from '@prisma/client'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '******',
          autoComplete: 'current-password'
        }
      },
      async authorize (credentials, req) {
        console.log('Credenciales recibidas:', credentials)
        const user = await prisma.usuarios.findFirst({
          where: {
            correo_electronico: credentials.email
          }
        })

        if (user) {
          console.log('Usuario encontrado en la base de datos:', user)

          // Compara la contraseña ingresada por el usuario con la contraseña cifrada en la base de datos
          const passwordMatch = await bcrypt.compare(credentials.password, user.contrasena)

          if (passwordMatch) {
            return user as any
          }
        }

        console.log('Autenticación fallida. Credenciales incorrectas o usuario no encontrado.')
        return null
      }
    })
  ],
  callbacks: {
    async jwt ({ account, token, user, profile, session }) {
      if (user) token.user = user
      return token
    },
    async session ({ session, token }) {
      session.user = token.user
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
})

export { handler as GET, handler as POST }
