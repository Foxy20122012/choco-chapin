import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const proveedores = await prisma.proveedores.findMany();
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

export async function POST(request: Request) {
  try {
    const {
        id,
        nombre,    
        direccion,   
        telefono,
        correo_electronico, 
        sitio_web,
    } = await request.json();

    const newproveedores = await prisma.proveedores.create({
      data: {
        id,
        nombre,    
        direccion,   
        telefono,
        correo_electronico, 
        sitio_web,
      },
    });

    return NextResponse.json(newproveedores);
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
