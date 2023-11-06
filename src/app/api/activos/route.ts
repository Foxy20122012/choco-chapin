import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const activos = await prisma.activos.findMany();
    return NextResponse.json(activos);
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
      valor_inicial,
      fecha_adquisicion,
      vida_util,
      depreciacion_acumulada,
    } = await request.json();

    const newActivos = await prisma.activos.create({
      data: {
        id,
        nombre,
        valor_inicial,
        fecha_adquisicion,
        vida_util,
        depreciacion_acumulada,
      },
    });

    return NextResponse.json(newActivos);
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
