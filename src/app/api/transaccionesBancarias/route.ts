import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const transaccionesBancarias = await prisma.transaccionesBancarias.findMany();
    return NextResponse.json(transaccionesBancarias);
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
        descripcion,       
        monto,     
        fecha,  
        estado,   
        referencia_bancaria,              
    } = await request.json();

    const transaccionesBancarias = await prisma.transaccionesBancarias.create({
      data: {
        id,
        descripcion,       
        monto,     
        fecha,  
        estado,   
        referencia_bancaria,    
      },
    });

    return NextResponse.json(transaccionesBancarias);
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
