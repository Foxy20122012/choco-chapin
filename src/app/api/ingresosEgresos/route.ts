import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const ingresosEgresos = await prisma.ingresosEgresos.findMany();
    return NextResponse.json(ingresosEgresos);
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
        descripcion,   
        monto,      
        fecha,   
        categoria_id,     
        es_ingreso,                 
    } = await request.json();

    const ingresosEgresos = await prisma.ingresosEgresos.create({
      data: {
        id,
        descripcion,   
        monto,      
        fecha,   
        categoria_id,     
        es_ingreso,    
      },
    });

    return NextResponse.json(ingresosEgresos);
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
