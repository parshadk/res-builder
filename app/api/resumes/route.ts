import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

// GET all resumes for a user
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    const resumes = await prisma.resume.findMany({
      where: { userId },
      include: {
        experiences: { orderBy: { order: "asc" } },
        educations: { orderBy: { order: "asc" } },
        skills: { orderBy: { order: "asc" } },
        projects: { orderBy: { order: "asc" } },
      },
      orderBy: { updatedAt: "desc" },
    })

    return NextResponse.json(resumes)
  } catch (error) {
    console.error("Error fetching resumes:", error)
    return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 })
  }
}

// POST create a new resume
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, title, fullName, email } = body

    if (!userId || !title || !fullName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const resume = await prisma.resume.create({
      data: {
        userId,
        title,
        fullName,
        email,
        template: "modern",
        primaryColor: "#1e40af",
        accentColor: "#0f172a",
        fontFamily: "inter",
      },
    })

    return NextResponse.json(resume, { status: 201 })
  } catch (error) {
    console.error("Error creating resume:", error)
    return NextResponse.json({ error: "Failed to create resume" }, { status: 500 })
  }
}
