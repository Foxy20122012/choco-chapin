import { type User as NextAuthUser } from 'next-auth'
import { type JWT as NextAuthJWT } from 'next-auth/jwt'

type UserId = string

declare module 'next-auth/jwt' {
  interface JWT extends NextAuthJWT {
    id: UserId
    username: string
    email: string
    firstName: string
    lastName: string
    avatarUrl?: string
    roles: UserRole[]
    createdAt: Date
    updatedAt: Date
  }
}

declare module 'next-auth' {
  interface User extends NextAuthUser {
    id: UserId
    username: string
    email: string
    firstName: string
    lastName: string
    avatarUrl?: string
    roles: UserRole[]
    createdAt: Date
    updatedAt: Date
  }

  interface Session {
    user: User
  }
}

interface UserRole {
  id: number
  name: string
}
