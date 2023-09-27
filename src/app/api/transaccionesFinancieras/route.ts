import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const transaccionesFinancieras = await prisma.transaccionesFinancieras.findMany();
    return NextResponse.json(transaccionesFinancieras);
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
        tipo,
        monto, 
        fecha_transaccion,
        descripcion,
    } = await request.json();

    const transaccionesFinancieras = await prisma.transaccionesFinancieras.create({
      data: {
        id,
        tipo,
        monto, 
        fecha_transaccion,
        descripcion,
      },
    });

    return NextResponse.json(transaccionesFinancieras);
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
