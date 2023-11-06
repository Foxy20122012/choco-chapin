import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const categoriasContabilidad = await prisma.categoriasContabilidad.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!categoriasContabilidad)
      return NextResponse.json({ message: "assets not found" }, { status: 404 });

    return NextResponse.json(categoriasContabilidad);
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
    const deletedcategoriasContabilidad = await prisma.categoriasContabilidad.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedcategoriasContabilidad)
      return NextResponse.json({ message: "Category not found" }, { status: 404 });

    return NextResponse.json(deletedcategoriasContabilidad);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Category not found",
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
        descripcion, 
        Gastos,
        IngresosEgresos, } = await request.json();

    const updatedcategoriasContabilidad = await prisma.categoriasContabilidad.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        nombre,       
        descripcion, 
        Gastos,
        IngresosEgresos,
      },
    });

    return NextResponse.json(updatedcategoriasContabilidad);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Category not found",
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
