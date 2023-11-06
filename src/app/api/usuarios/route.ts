import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const usuarios = await prisma.usuarios.findMany();
    return NextResponse.json(usuarios);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const {          
        id,       
        nombre_usuario,
        contrasena,
        nombre_completo,   
        correo_electronico,
    } = await request.json();

    const newUsuarios = await prisma.usuarios.create({
      data: {
        id,       
        nombre_usuario,
        contrasena,
        nombre_completo,   
        correo_electronico,
      },
    });

    return NextResponse.json(newUsuarios);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
