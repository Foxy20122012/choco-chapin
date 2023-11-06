import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/libs/prisma'

interface Params {
  params: { id: string }
}

export async function GET (request: Request, { params }: Params) {
  console.log(params.id)
  try {
    const costosProduccion = await prisma.costosProduccion.findFirst({
      where: {
        id: Number(params.id)
      }
    })

    if (!costosProduccion) { return NextResponse.json({ message: ' not found' }, { status: 404 }) }

    return NextResponse.json(costosProduccion)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message
        },
        {
          status: 500
        }
      )
    }
  }
}

export async function DELETE (request: Request, { params }: Params) {
  try {
    const deletedcostosProduccion = await prisma.costosProduccion.delete({
      where: {
        id: Number(params.id)
      }
    })
    if (!deletedcostosProduccion) { return NextResponse.json({ message: 'Category not found' }, { status: 404 }) }

    return NextResponse.json(deletedcostosProduccion)
  } catch (error) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          {
            message: 'Category not found'
          },
          {
            status: 404
          }
        )
      }

      return NextResponse.json(
        {
          message: error.message
        },
        {
          status: 500
        }
      )
    }
  }
}

export async function PUT (request: Request, { params }: Params) {
  try {
    const {
      id,
      costo_materias_primas,
      costo_mano_de_obra,
      fecha,
      otros_costos,
      cantidad_producida,
      costo_total,
      codigo_producto
    } = await request.json()

    const updatedcostosProduccion = await prisma.costosProduccion.update({
      where: {
        id: Number(params.id)
      },
      data: {
        id,
        costo_materias_primas,
        costo_mano_de_obra,
        fecha,
        otros_costos,
        cantidad_producida,
        costo_total,
        codigo_producto
      }
    })

    return NextResponse.json(updatedcostosProduccion)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          {
            message: ' not found'
          },
          {
            status: 404
          }
        )
      }

      return NextResponse.json(
        {
          message: error.message
        },
        {
          status: 500
        }
      )
    }
  }
}
