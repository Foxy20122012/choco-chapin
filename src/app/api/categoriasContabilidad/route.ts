import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const categoriasContabilidad = await prisma.categoriasContabilidad.findMany();
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

export async function POST(request: Request) {
  try {
    const {
        id,
        nombre,       
        descripcion, 
        Gastos,
        IngresosEgresos, 
    } = await request.json();

    const newcategoriasContabilidad = await prisma.categoriasContabilidad.create({
      data: {
        id,
        nombre,       
        descripcion, 
        Gastos,
        IngresosEgresos, 
      },
    });

    return NextResponse.json(newcategoriasContabilidad);
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
