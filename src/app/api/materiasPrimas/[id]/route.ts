import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const materiasPrimas = await prisma.materiasPrimas.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!materiasPrimas)
      return NextResponse.json({ message: "Raw material not found" }, { status: 404 });

    return NextResponse.json(materiasPrimas);
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
    const deletedmateriasPrimas = await prisma.materiasPrimas.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedmateriasPrimas)
      return NextResponse.json({ message: "Raw material not found" }, { status: 404 });

    return NextResponse.json(deletedmateriasPrimas);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Bills not found",
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
    const {   id,
        nombre,
        cantidad_inicial,
        proveedor_id,
        fecha_recepcion,
        codigo_unidad,
        precio_unitario,
        fecha_vencimiento,
        ubicacion_almacen,
        descripcion,
     } = await request.json();

    const updatedmateriasPrimas = await prisma.materiasPrimas.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        nombre,
        cantidad_inicial,
        proveedor_id,
        fecha_recepcion,
        codigo_unidad,
        precio_unitario,
        fecha_vencimiento,
        ubicacion_almacen,
        descripcion,
      },
    });

    return NextResponse.json(updatedmateriasPrimas);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Raw material not found",
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
