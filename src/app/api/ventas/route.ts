import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const ventas = await prisma.ventas.findMany();
    return NextResponse.json(ventas);
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
        cliente_id,
        monto_total,
        fecha_venta,
        metodo_pago,
        estado_pedido,
        descripcion,
    } = await request.json();

    const ventas = await prisma.ventas.create({
      data: {
        id,
        cliente_id,
        monto_total,
        fecha_venta,
        metodo_pago,
        estado_pedido,
        descripcion,
      },
    });

    return NextResponse.json(ventas);
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
