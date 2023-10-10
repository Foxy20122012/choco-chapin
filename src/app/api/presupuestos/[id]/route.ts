import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const presupuestos = await prisma.presupuestos.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!presupuestos)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json(presupuestos);
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
    const deletedpresupuestos = await prisma.presupuestos.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedpresupuestos)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json(deletedpresupuestos);
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
        nombre,   
        monto_asignado,
        fecha_inicio,  
        fecha_fin,  
    } = await request.json();

    const updatedpresupuestos = await prisma.presupuestos.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        nombre,   
        monto_asignado,
        fecha_inicio,  
        fecha_fin, 
      },
    });

    return NextResponse.json(updatedpresupuestos);
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

