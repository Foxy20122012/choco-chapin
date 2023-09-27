import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const proveedores = await prisma.proveedores.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!proveedores)
      return NextResponse.json({ message: "Product not found" }, { status: 404 });

    return NextResponse.json(proveedores);
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
    const deletedproveedores = await prisma.proveedores.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedproveedores)
      return NextResponse.json({ message: "Supplier not found" }, { status: 404 });

    return NextResponse.json(deletedproveedores);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Supplier not found",
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
        direccion,   
        telefono,
        correo_electronico, 
        sitio_web,
     } = await request.json();

    const updatedproveedores = await prisma.proveedores.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,
        nombre,    
        direccion,   
        telefono,
        correo_electronico, 
        sitio_web,
      },
    });

    return NextResponse.json(updatedproveedores);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Supplier not found",
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
