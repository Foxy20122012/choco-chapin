import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const clientes = await prisma.clientes.findMany();
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

export async function POST(request: Request) {
  try {
    const {  nombre, direccion, telefono, correo_electronico, fecha_registro, historial_compras, } = await request.json();

    const newClientes = await prisma.clientes.create({
      data: {
        nombre,          
        direccion,         
        telefono,        
        correo_electronico,
        fecha_registro, 
        historial_compras,
      },
    });

    return NextResponse.json(newClientes);
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
