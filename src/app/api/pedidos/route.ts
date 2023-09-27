import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const materiaspedidos = await prisma.pedidos.findMany();
    return NextResponse.json(materiasPrimas);
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
      cantidad_inicial,
      proveedor_id,
      fecha_recepcion,
      codigo_unidad,
      precio_unitario,
      fecha_vencimiento,
      ubicacion_almacen,
      descripcion,
    } = await request.json();

    const newmateriasPrimas = await prisma.materiasPrimas.create({
      data: {
        id,
        nombre,
        cantidad_inicial,
        proveedor_id,
        fecha_recepcion,
        codigo_unidad,
        precio_unitario,
        fecha_vencimiento,
        ubicacion_almacen,
        descripcion,
      },
    });

    return NextResponse.json(newmateriasPrimas);
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
