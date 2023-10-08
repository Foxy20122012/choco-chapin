import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const gastos = await prisma.gastos.findMany();
    return NextResponse.json(gastos);
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
        categoria_gasto,     
        categoria_gasto_id,        
    } = await request.json();

    const gastos = await prisma.gastos.create({
      data: {
        id,
        descripcion,  
        monto,
        fecha,  
        categoria_gasto,     
        categoria_gasto_id, 
      },
    });

    return NextResponse.json(gastos);
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
