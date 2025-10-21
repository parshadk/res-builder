import { prisma } from "@/lib/prisma"
import { ModernTemplate } from "@/components/resume-preview/modern-template"
import { MinimalTemplate } from "@/components/resume-preview/minimal-template"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

interface PublicResumePageProps {
  params: {
    token: string
  }
}

export default async function PublicResumePage({ params }: PublicResumePageProps) {
  const resume = await prisma.resume.findUnique({
    where: { shareToken: params.token },
    include: {
      experiences: { orderBy: { order: "asc" } },
      educations: { orderBy: { order: "asc" } },
      skills: { orderBy: { order: "asc" } },
      projects: { orderBy: { order: "asc" } },
    },
  })

  if (!resume || !resume.isPublic) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary">
            <ArrowLeft size={20} />
            Back to Builder
          </Link>
          <h1 className="text-2xl font-bold text-foreground">{resume.fullName}'s Resume</h1>
          <div className="w-20" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          id="resume-preview"
          className="bg-white rounded-lg shadow-lg overflow-hidden border border-border"
          style={{
            fontFamily: resume.fontFamily === "inter" ? "Inter, sans-serif" : "Georgia, serif",
          }}
        >
          {resume.template === "modern" ? <ModernTemplate /> : <MinimalTemplate />}
        </div>
      </div>
    </div>
  )
}
