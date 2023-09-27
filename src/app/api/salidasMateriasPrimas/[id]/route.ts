import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const salidasMateriasPrimas = await prisma.salidasMateriasPrimas.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!salidasMateriasPrimas)
      return NextResponse.json({ message: "Product output not found" }, { status: 404 });

    return NextResponse.json(salidasMateriasPrimas);
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
    const deletedsalidasMateriasPrimas = await prisma.salidasMateriasPrimas.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedsalidasMateriasPrimas)
      return NextResponse.json({ message: "Product output not found" }, { status: 404 });

    return NextResponse.json(deletedsalidasMateriasPrimas);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Product output not found",
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
        materia_prima_id,
        cantidad,
        fecha_salida,
        destino,
        responsable_salida,
        descripcion,
     } = await request.json();

    const updatedsalidasMateriasPrimas = await prisma.salidasMateriasPrimas.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        materia_prima_id,
        cantidad,
        fecha_salida,
        destino,
        responsable_salida,
        descripcion,
      },
    });

    return NextResponse.json(updatedsalidasMateriasPrimas);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Product output not found",
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
