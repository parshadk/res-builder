import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

// GET resume by share token
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "token is required" }, { status: 400 })
    }

    const resume = await prisma.resume.findUnique({
      where: { shareToken: token },
      include: {
        experiences: { orderBy: { order: "asc" } },
        educations: { orderBy: { order: "asc" } },
        skills: { orderBy: { order: "asc" } },
        projects: { orderBy: { order: "asc" } },
      },
    })

    if (!resume || !resume.isPublic) {
      return NextResponse.json({ error: "Resume not found or not public" }, { status: 404 })
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error("Error fetching shared resume:", error)
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 })
  }
}

// PUT update share status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { resumeId, isPublic, shareToken } = body

    if (!resumeId) {
      return NextResponse.json({ error: "resumeId is required" }, { status: 400 })
    }

    const resume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        isPublic,
        shareToken: isPublic ? shareToken : null,
      },
    })

    return NextResponse.json(resume)
  } catch (error) {
    console.error("Error updating share status:", error)
    return NextResponse.json({ error: "Failed to update share status" }, { status: 500 })
  }
}
