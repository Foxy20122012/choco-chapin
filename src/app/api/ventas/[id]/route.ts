import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const ventas = await prisma.ventas.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!ventas)
      return NextResponse.json({ message: "Financial transaction not found" }, { status: 404 });

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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedventas = await prisma.ventas.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedventas)
      return NextResponse.json({ message: "Financial transaction not found" }, { status: 404 });

    return NextResponse.json(deletedventas);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Financial transaction not found",
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
        cliente_id,
        monto_total,
        fecha_venta,
        metodo_pago,
        estado_pedido,
        descripcion,
        codigo_materia,
     } = await request.json();

    const updatedventas = await prisma.ventas.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        cliente_id,
        monto_total,
        fecha_venta,
        metodo_pago,
        estado_pedido,
        descripcion,
        codigo_materia,
      },
    });

    return NextResponse.json(updatedventas);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Financial transaction not found",
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

