import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const productosTerminados = await prisma.productosTerminados.findMany();
    return NextResponse.json(productosTerminados);
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
        tipo_dulce, 
        cantidad_producida,
        fecha_produccion,
        precio_venta,
        descripcion,
    } = await request.json();

    const newproductosTerminados = await prisma.productosTerminados.create({
      data: {
        id,
        nombre,   
        tipo_dulce, 
        cantidad_producida,
        fecha_produccion,
        precio_venta,
        descripcion,
      },
    });

    return NextResponse.json(newproductosTerminados);
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
