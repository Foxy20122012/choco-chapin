import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const facturas = await prisma.facturas.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!facturas)
      return NextResponse.json({ message: "Bills not found" }, { status: 404 });

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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedfacturas = await prisma.facturas.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedfacturas)
      return NextResponse.json({ message: "Bills not found" }, { status: 404 });

    return NextResponse.json(deletedfacturas);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Bills not found",
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
    const { id, numero_factura, fecha_emision, subtotal, impuestos, total, descripcion, } = await request.json();

    const updatedfacturas = await prisma.facturas.update({
      where: {
        id: Number(params.id),
      },
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

    return NextResponse.json(updatedfacturas);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Bills not found",
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
