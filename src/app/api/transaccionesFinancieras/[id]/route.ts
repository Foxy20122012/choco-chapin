import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const transaccionesFinancieras = await prisma.transaccionesFinancieras.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!transaccionesFinancieras)
      return NextResponse.json({ message: "Financial transaction not found" }, { status: 404 });

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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedtransaccionesFinancieras = await prisma.transaccionesFinancieras.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedtransaccionesFinancieras)
      return NextResponse.json({ message: "Financial transaction not found" }, { status: 404 });

    return NextResponse.json(deletedtransaccionesFinancieras);
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
        tipo,
        monto, 
        fecha_transaccion,
        descripcion,
     } = await request.json();

    const updatedtransaccionesFinancieras = await prisma.transaccionesFinancieras.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        tipo,
        monto, 
        fecha_transaccion,
        descripcion,
      },
    });

    return NextResponse.json(updatedtransaccionesFinancieras);
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
