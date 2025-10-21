import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

// POST add experience
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { jobTitle, company, location, startDate, endDate, isCurrently, description } = body

    const maxOrder = await prisma.experience.findFirst({
      where: { resumeId: params.id },
      orderBy: { order: "desc" },
      select: { order: true },
    })

    const experience = await prisma.experience.create({
      data: {
        resumeId: params.id,
        jobTitle,
        company,
        location,
        startDate,
        endDate,
        isCurrently,
        description,
        order: (maxOrder?.order ?? -1) + 1,
      },
    })

    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    console.error("Error creating experience:", error)
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }
}

// PUT update experience
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { experienceId, ...updateData } = body

    const experience = await prisma.experience.update({
      where: { id: experienceId },
      data: updateData,
    })

    return NextResponse.json(experience)
  } catch (error) {
    console.error("Error updating experience:", error)
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 })
  }
}

// DELETE experience
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const experienceId = request.nextUrl.searchParams.get("experienceId")

    if (!experienceId) {
      return NextResponse.json({ error: "experienceId is required" }, { status: 400 })
    }

    await prisma.experience.delete({
      where: { id: experienceId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting experience:", error)
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
  }
}
