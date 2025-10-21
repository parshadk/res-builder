import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

// POST add project
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, description, link } = body

    const maxOrder = await prisma.project.findFirst({
      where: { resumeId: params.id },
      orderBy: { order: "desc" },
      select: { order: true },
    })

    const project = await prisma.project.create({
      data: {
        resumeId: params.id,
        title,
        description,
        link,
        order: (maxOrder?.order ?? -1) + 1,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

// PUT update project
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { projectId, ...updateData } = body

    const project = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE project
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = request.nextUrl.searchParams.get("projectId")

    if (!projectId) {
      return NextResponse.json({ error: "projectId is required" }, { status: 400 })
    }

    await prisma.project.delete({
      where: { id: projectId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
