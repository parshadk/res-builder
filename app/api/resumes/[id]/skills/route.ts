import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

// POST add skill
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, level } = body

    const maxOrder = await prisma.skill.findFirst({
      where: { resumeId: params.id },
      orderBy: { order: "desc" },
      select: { order: true },
    })

    const skill = await prisma.skill.create({
      data: {
        resumeId: params.id,
        name,
        level,
        order: (maxOrder?.order ?? -1) + 1,
      },
    })

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error("Error creating skill:", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}

// PUT update skill
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { skillId, ...updateData } = body

    const skill = await prisma.skill.update({
      where: { id: skillId },
      data: updateData,
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error("Error updating skill:", error)
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
  }
}

// DELETE skill
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const skillId = request.nextUrl.searchParams.get("skillId")

    if (!skillId) {
      return NextResponse.json({ error: "skillId is required" }, { status: 400 })
    }

    await prisma.skill.delete({
      where: { id: skillId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting skill:", error)
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
  }
}
