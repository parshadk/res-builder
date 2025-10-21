import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

// POST add education
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { school, degree, field, startDate, endDate, description } = body

    const maxOrder = await prisma.education.findFirst({
      where: { resumeId: params.id },
      orderBy: { order: "desc" },
      select: { order: true },
    })

    const education = await prisma.education.create({
      data: {
        resumeId: params.id,
        school,
        degree,
        field,
        startDate,
        endDate,
        description,
        order: (maxOrder?.order ?? -1) + 1,
      },
    })

    return NextResponse.json(education, { status: 201 })
  } catch (error) {
    console.error("Error creating education:", error)
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 })
  }
}

// PUT update education
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { educationId, ...updateData } = body

    const education = await prisma.education.update({
      where: { id: educationId },
      data: updateData,
    })

    return NextResponse.json(education)
  } catch (error) {
    console.error("Error updating education:", error)
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 })
  }
}

// DELETE education
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const educationId = request.nextUrl.searchParams.get("educationId")

    if (!educationId) {
      return NextResponse.json({ error: "educationId is required" }, { status: 400 })
    }

    await prisma.education.delete({
      where: { id: educationId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting education:", error)
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 })
  }
}
