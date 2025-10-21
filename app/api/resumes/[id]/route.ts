import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

// GET a single resume
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: params.id },
      include: {
        experiences: { orderBy: { order: "asc" } },
        educations: { orderBy: { order: "asc" } },
        skills: { orderBy: { order: "asc" } },
        projects: { orderBy: { order: "asc" } },
      },
    })

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error("Error fetching resume:", error)
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 })
  }
}

// PUT update a resume
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const resume = await prisma.resume.update({
      where: { id: params.id },
      data: {
        title: body.title,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        location: body.location,
        summary: body.summary,
        template: body.template,
        primaryColor: body.primaryColor,
        accentColor: body.accentColor,
        fontFamily: body.fontFamily,
        isPublic: body.isPublic,
        shareToken: body.shareToken,
      },
      include: {
        experiences: { orderBy: { order: "asc" } },
        educations: { orderBy: { order: "asc" } },
        skills: { orderBy: { order: "asc" } },
        projects: { orderBy: { order: "asc" } },
      },
    })

    return NextResponse.json(resume)
  } catch (error) {
    console.error("Error updating resume:", error)
    return NextResponse.json({ error: "Failed to update resume" }, { status: 500 })
  }
}

// DELETE a resume
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.resume.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting resume:", error)
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 })
  }
}
