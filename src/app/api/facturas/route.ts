import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const facturas = await prisma.facturas.findMany();
    return NextResponse.json(facturas);
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
    const { id, numero_factura, fecha_emision, subtotal, impuestos, total, descripcion, } = await request.json();

    const newfacturas = await prisma.facturas.create({
      data: {
        id,
        numero_factura,
        fecha_emision,
        subtotal,
        impuestos,
        total,
        descripcion,
      },
    });

    return NextResponse.json(newfacturas);
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