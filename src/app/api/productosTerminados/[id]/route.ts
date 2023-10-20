import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const productosTerminados = await prisma.productosTerminados.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!productosTerminados)
      return NextResponse.json({ message: "Product not found" }, { status: 404 });

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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedproductosTerminados = await prisma.productosTerminados.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedproductosTerminados)
      return NextResponse.json({ message: "Product not found" }, { status: 404 });

    return NextResponse.json(deletedproductosTerminados);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Product not found",
          },
          {
            status: 404,
          }
        );
      }

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

export async function PUT(request: Request, { params }: Params) {
  try {
    const {   
        id,
        nombre,   
        tipo_dulce, 
        cantidad_producida,
        fecha_produccion,
        precio_venta,
        descripcion,
        codigo, 
     } = await request.json();

    const updatedproductosTerminados = await prisma.productosTerminados.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        nombre,   
        tipo_dulce, 
        cantidad_producida,
        fecha_produccion,
        precio_venta,
        descripcion,
        codigo, 
      },
    });

    return NextResponse.json(updatedproductosTerminados);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Product material not found",
          },
          {
            status: 404,
          }
        );
      }

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