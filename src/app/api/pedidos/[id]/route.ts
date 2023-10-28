import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const pedidos = await prisma.pedidos.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!pedidos)
      return NextResponse.json({ message: "Order material not found" }, { status: 404 });

    return NextResponse.json(pedidos);
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
    const deletedpedidos = await prisma.pedidos.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedpedidos)
      return NextResponse.json({ message: "Order material not found" }, { status: 404 });

    return NextResponse.json(deletedpedidos);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Order not found",
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
        cliente_id,    
        fecha_pedido, 
        fecha_entrega,  
        estado_pedido,
        detalles_pedido,
        codigo_pedido,
        tipo_pago,  
        direccion_envio, 
        notas,    
        codigo_venta,
     } = await request.json();

    const updatedpedidos = await prisma.pedidos.update({
      where: {
        id: Number(params.id),
      },
      data: {
        id,     
        cliente_id,    
        fecha_pedido, 
        fecha_entrega,  
        estado_pedido,
        detalles_pedido,
        codigo_pedido,
        tipo_pago,  
        direccion_envio, 
        notas,    
        codigo_venta,
      },
    });

    return NextResponse.json(updatedpedidos);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Order material not found",
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
