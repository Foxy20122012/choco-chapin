import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const cuentasBancarias = await prisma.cuentasBancarias.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!cuentasBancarias)
      return NextResponse.json({ message: " not found" }, { status: 404 });

    return NextResponse.json(cuentasBancarias);
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
    const deletedcuentasBancarias = await prisma.cuentasBancarias.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedcuentasBancarias)
      return NextResponse.json({ message: "Category not found" }, { status: 404 });

    return NextResponse.json(deletedcuentasBancarias);
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
        numero_cuenta,
        banco, 
        saldo_actual, 
    } = await request.json();

    const updatedcuentasBancarias = await prisma.cuentasBancarias.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        nombre, 
        numero_cuenta,
        banco, 
        saldo_actual,  
      },
    });

    return NextResponse.json(updatedcuentasBancarias);
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
