import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

// GET para obtener todas las materias primas
export async function GET() {
  try {
    const materiasPrimas = await prisma.materiasPrimas.findMany();
    return NextResponse.json(materiasPrimas);
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

// POST para agregar nuevas materias primas al inventario
export async function POST(request: Request) {
  try {
    const {
      nombre,
      cantidad_inicial,
      proveedor_id,
      fecha_recepcion,
      codigo_unidad,
      precio_unitario,
      fecha_vencimiento,
      ubicacion_almacen,
      descripcion,
      cuenta,
    } = await request.json();

    // Genera un código único para la materia prima (puedes personalizar la generación de códigos)
    const codigoUnico = generateUniqueCode();

    // Crea una nueva materia prima en la base de datos
    const newMateriaPrima = await prisma.materiasPrimas.create({
      data: {
        nombre,
        cantidad_inicial,
        proveedor_id,
        fecha_recepcion,
        codigo_unidad: codigoUnico, // Asigna el código único
        precio_unitario,
        fecha_vencimiento,
        ubicacion_almacen,
        descripcion,
        cuenta  
      },
    });

    return NextResponse.json(newMateriaPrima);
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

// Función para generar un código único para la materia prima (personaliza según tus necesidades)
function generateUniqueCode() {
  const uniqueCode = generateRandomCode(); // Genera un código aleatorio
  // Verifica si el código ya existe en la base de datos (asegúrate de que sea realmente único)
  // Si el código existe, genera uno nuevo
  // Si el código no existe, devuelve el código único generado
  return uniqueCode;
}

// Función para generar un código aleatorio (personaliza según tus necesidades)
function generateRandomCode() {
  // Lógica para generar un código aleatorio
  return "MP" + Math.floor(Math.random() * 10000); // Ejemplo de generación de código aleatorio
}
