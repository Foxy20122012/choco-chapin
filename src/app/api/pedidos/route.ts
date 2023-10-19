import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const pedidos = await prisma.pedidos.findMany();
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

export async function POST(request: Request) {
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

    const newpedidos = await prisma.pedidos.create({
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

    return NextResponse.json(newpedidos);
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

