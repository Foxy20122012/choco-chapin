import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const registroImpuestos = await prisma.registroImpuestos.findMany();
    return NextResponse.json(registroImpuestos);
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
        tipo_impuesto, 
        monto_pagado,
        fecha_pago,                  
    } = await request.json();

    const registroImpuestos = await prisma.registroImpuestos.create({
      data: {
        id,
        tipo_impuesto, 
        monto_pagado,
        fecha_pago,     
      },
    });

    return NextResponse.json(registroImpuestos);
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
