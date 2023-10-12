import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const salidasMateriasPrimas = await prisma.salidasMateriasPrimas.findMany();
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

export async function POST(request: Request) {
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

    const salidasMateriasPrimas = await prisma.salidasMateriasPrimas.create({
      data: {
        id,
        materia_prima_id,
        cantidad,
        fecha_salida,
        destino,
        responsable_salida,
        descripcion,
        codigo_materia_prima // Asegúrate de incluir el nuevo campo en la creación del registro
      },
    });

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
