import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const clientes = await prisma.clientes.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!clientes)
      return NextResponse.json({ message: "Clients not found" }, { status: 404 });

    return NextResponse.json(clientes);
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
    const deletedclientes = await prisma.clientes.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedclientes)
      return NextResponse.json({ message: "Clients not found" }, { status: 404 });

    return NextResponse.json(deletedclientes);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Client not found",
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
    const { nombre, direccion, telefono, correo_electronico, fecha_registro, historial_compras } = await request.json();

    const updatedclientes = await prisma.clientes.update({
      where: {
        id: Number(params.id),
      },
      data: {
        nombre,          
        direccion,         
        telefono,        
        correo_electronico,
        fecha_registro, 
        historial_compras,
      },
    });

    return NextResponse.json(updatedclientes);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Clients not found",
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
