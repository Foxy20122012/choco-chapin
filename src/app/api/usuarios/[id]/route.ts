import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const usuarios = await prisma.usuarios.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!usuarios)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedusuarios = await prisma.usuarios.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedusuarios)
      return NextResponse.json(
        { message: "Usuarios not found" },
        { status: 404 }
      );

    return NextResponse.json(deletedusuarios);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Usuarios not found",
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
    const {
      id,
      nombre_usuario,
      contrasena,
      nombre_completo,
      correo_electronico,
    } = await request.json();

    const updatedusuarios = await prisma.usuarios.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        nombre_usuario,
        contrasena,
        nombre_completo,
        correo_electronico,
      },
    });

    return NextResponse.json(updatedusuarios);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Usuarios not found",
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
