import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const presupuestos = await prisma.presupuestos.findMany();
    return NextResponse.json(presupuestos);
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
        nombre,   
        monto_asignado,
        fecha_inicio,  
        fecha_fin,                  
    } = await request.json();

    const presupuestos = await prisma.presupuestos.create({
      data: {
        id,
        nombre,   
        monto_asignado,
        fecha_inicio,  
        fecha_fin,    
      },
    });

    return NextResponse.json(presupuestos);
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
