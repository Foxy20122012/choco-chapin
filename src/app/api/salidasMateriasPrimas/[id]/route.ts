import { NextResponse } from "next/server";
import { Prisma, SalidasMateriasPrimas } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const salidasMateriasPrimas = await prisma.salidasMateriasPrimas.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!salidasMateriasPrimas) {
      return NextResponse.json({ message: "Salida de materias primas no encontrada" }, { status: 404 });
    }

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
    const deletedSalidasMateriasPrimas = await prisma.salidasMateriasPrimas.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!deletedSalidasMateriasPrimas) {
      return NextResponse.json({ message: "Salida de materias primas no encontrada" }, { status: 404 });
    }

    return NextResponse.json(deletedSalidasMateriasPrimas);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Salida de materias primas no encontrada",
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
      codigo_materia_prima
    } = await request.json();

    const updatedSalidasMateriasPrimas = await prisma.salidasMateriasPrimas.update({
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
        codigo_materia_prima // Añadir el campo código de materia prima
      },
    });

    return NextResponse.json(updatedSalidasMateriasPrimas);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Salida de materias primas no encontrada",
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
