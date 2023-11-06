import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const ingresosEgresos = await prisma.ingresosEgresos.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!ingresosEgresos)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json(ingresosEgresos);
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
    const deletedingresosEgresos = await prisma.ingresosEgresos.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedingresosEgresos)
      return NextResponse.json({ message: "Category not found" }, { status: 404 });

    return NextResponse.json(deletedingresosEgresos);
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
        categoria_id,     
        es_ingreso, 
    } = await request.json();

    const updatedingresosEgresos = await prisma.ingresosEgresos.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        descripcion,   
        monto,      
        fecha,   
        categoria_id,     
        es_ingreso, 
      },
    });

    return NextResponse.json(updatedingresosEgresos);
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

