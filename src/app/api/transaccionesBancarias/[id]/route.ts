import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const transaccionesBancarias = await prisma.transaccionesBancarias.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!transaccionesBancarias)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json(transaccionesBancarias);
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
    const deletedtransaccionesBancarias = await prisma.transaccionesBancarias.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedtransaccionesBancarias)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json(deletedtransaccionesBancarias);
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
        descripcion,       
        monto,     
        fecha,  
        estado,   
        referencia_bancaria,   
    } = await request.json();

    const updatedtransaccionesBancarias = await prisma.transaccionesBancarias.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        descripcion,       
        monto,     
        fecha,  
        estado,   
        referencia_bancaria,  
      },
    });

    return NextResponse.json(updatedtransaccionesBancarias);
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

