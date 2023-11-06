import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const registroImpuestos = await prisma.registroImpuestos.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!registroImpuestos)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedregistroImpuestos = await prisma.registroImpuestos.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedregistroImpuestos)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json(deletedregistroImpuestos);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Not found",
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
        tipo_impuesto, 
        monto_pagado,
        fecha_pago,  
    } = await request.json();

    const updatedregistroImpuestos = await prisma.registroImpuestos.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        tipo_impuesto, 
        monto_pagado,
        fecha_pago, 
      },
    });

    return NextResponse.json(updatedregistroImpuestos);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Not found",
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

