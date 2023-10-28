import { NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
import { signIn } from 'next-auth/react'
import bcrypt from 'bcrypt'
import Credentials from 'next-auth/providers/credentials'

export async function GET () {
  try {
    const Usuarios = await prisma.usuarios.findMany()
    return NextResponse.json(Usuarios)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message
        },
        {
          status: 500
        }
      )
    }
  }
}

const prisma = new PrismaClient()

// Función para validar el formato de correo electrónico
function isValidEmail (email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
  return emailRegex.test(email)
}

export async function POST (request: Request) {
  try {
    const { nombre_usuario, contrasena, nombre_completo, correo_electronico } = await request.json()

    if (!nombre_usuario || !contrasena || !nombre_completo || !correo_electronico || !isValidEmail(correo_electronico)) {
      return NextResponse.json(
        { message: 'All fields are required, and please provide a valid and complete Gmail address' },
        { status: 400 }
      )
    }

    const existingUserByUsername = await prisma.usuarios.findFirst({
      where: { nombre_usuario }
    })

    if (existingUserByUsername) {
      return NextResponse.json(
        { message: 'User with this username already exists' },
        { status: 400 }
      )
    }

    const existingUserByEmail = await prisma.usuarios.findFirst({
      where: { correo_electronico }
    })

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: 'User with this email is already registered' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10) // Generar el hash de la contraseña

    const newUser: Prisma.UsuariosCreateInput = {
      nombre_usuario,
      contrasena: hashedPassword, // Almacenar la contraseña encriptada en la base de datos
      nombre_completo,
      correo_electronico
    }

    const createdUser = await prisma.usuarios.create({
      data: newUser
    })

    return NextResponse.json(createdUser)

    // signIn('credentials',{
    //   email: res.data.email,
    // })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && (error.meta.target as string[]).includes('correo_electronico_unique')) {
        return NextResponse.json(
          { message: 'User with this email is already registered' },
          { status: 400 }
        )
      }
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message
        },
        {
          status: 500
        }
      )
    }
  } finally {
    await prisma.$disconnect()
  }
}
