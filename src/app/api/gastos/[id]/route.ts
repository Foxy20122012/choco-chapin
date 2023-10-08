import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const gastos = await prisma.gastos.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!gastos)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json(gastos);
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
    const deletedgastos = await prisma.gastos.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedgastos)
      return NextResponse.json({ message: "Category not found" }, { status: 404 });

    return NextResponse.json(deletedgastos);
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
        categoria_gasto,     
        categoria_gasto_id,
    } = await request.json();

    const updatedgastos = await prisma.gastos.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        descripcion,  
        monto,
        fecha,  
        categoria_gasto,     
        categoria_gasto_id, 
      },
    });

    return NextResponse.json(updatedgastos);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: " not found",
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
