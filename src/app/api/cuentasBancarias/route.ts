import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const cuentasBancarias = await prisma.cuentasBancarias.findMany();
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

export async function POST(request: Request) {
  try {
    const {
        id,
        nombre, 
        numero_cuenta,
        banco, 
        saldo_actual,  
    } = await request.json();

    const cuentasBancarias = await prisma.cuentasBancarias.create({
      data: {
        id,
        nombre, 
        numero_cuenta,
        banco, 
        saldo_actual, 
      },
    });

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
