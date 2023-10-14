import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const costosProduccion = await prisma.costosProduccion.findMany();
    return NextResponse.json(costosProduccion);
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
        tipo_dulce_id,     
        costo_materias_primas,
        costo_mano_de_obra,
        fecha,   
    } = await request.json();

    const newcostosProduccion = await prisma.costosProduccion.create({
      data: {
        id,
        //@ts-ignore
        tipo_dulce_id,     
        costo_materias_primas,
        costo_mano_de_obra,
        fecha,  
      },
    });

    return NextResponse.json(newcostosProduccion);
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
