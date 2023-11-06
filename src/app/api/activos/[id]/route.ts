import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const activos = await prisma.activos.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!activos)
      return NextResponse.json({ message: "assets not found" }, { status: 404 });

    return NextResponse.json(activos);
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
    const deletedactivos = await prisma.activos.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedactivos)
      return NextResponse.json({ message: "Assets not found" }, { status: 404 });

    return NextResponse.json(deletedactivos);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Assets not found",
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
        nombre,
        valor_inicial,
        fecha_adquisicion,
        vida_util,
        depreciacion_acumulada, } = await request.json();

    const updatedactivos = await prisma.activos.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        nombre,
        valor_inicial,
        fecha_adquisicion,
        vida_util,
        depreciacion_acumulada,
      },
    });

    return NextResponse.json(updatedactivos);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Assets not found",
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
