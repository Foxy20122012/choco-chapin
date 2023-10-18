import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const empleados = await prisma.empleados.findMany();
    return NextResponse.json(empleados);
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
      nombre,
      apellido,
      direccion,
      telefono,
      correo_electronico,
      puesto,
      salario,
    } = await request.json();

    const newEmpleado = await prisma.empleados.create({
      data: {
        nombre,
        apellido,
        direccion,
        telefono,
        correo_electronico,
        puesto,
        salario,
      },
    });

    return NextResponse.json(newEmpleado);
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

