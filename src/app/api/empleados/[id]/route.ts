import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const empleado = await prisma.empleados.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!empleado)
      return NextResponse.json({ message: "Empleado not found" }, { status: 404 });

    return NextResponse.json(empleado);
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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedEmpleado = await prisma.empleados.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!deletedEmpleado)
      return NextResponse.json({ message: "Empleado not found" }, { status: 404 });

    return NextResponse.json(deletedEmpleado);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Empleado not found",
          },
          {
            status: 404,
          }
        );
      }

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

export async function PUT(request: Request, { params }: Params) {
  try {
    const { nombre, apellido, direccion, telefono, correo_electronico, puesto, salario } = await request.json();

    const updatedEmpleado = await prisma.empleados.update({
      where: {
        id: Number(params.id),
      },
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

    return NextResponse.json(updatedEmpleado);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Empleado not found",
          },
          {
            status: 404,
          }
        );
      }

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


