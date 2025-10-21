"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"

export function MinimalTemplate() {
  const resume = useSelector((state: RootState) => state.resume)
  const design = useSelector((state: RootState) => state.design)

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const [year, month] = dateStr.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div
      className="w-full bg-white p-12 text-foreground"
      style={{
        fontFamily: design.fontFamily === "inter" ? "Inter, sans-serif" : "Georgia, serif",
      }}
    >
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-light mb-2">{resume.fullName}</h1>
        <div className="flex gap-6 text-sm text-muted">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-12">
          <p className="text-foreground leading-relaxed max-w-2xl">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experiences.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-6 uppercase tracking-widest text-muted">Experience</h2>
          <div className="space-y-8">
            {resume.experiences.map((exp) => (
              <div key={exp.id} className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-sm text-muted">
                    {formatDate(exp.startDate)} - {exp.isCurrently ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                <div className="col-span-2">
                  <h3 className="font-semibold mb-1">{exp.jobTitle}</h3>
                  <p className="text-muted mb-2">{exp.company}</p>
                  {exp.description && <p className="text-foreground text-sm leading-relaxed">{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.educations.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-6 uppercase tracking-widest text-muted">Education</h2>
          <div className="space-y-6">
            {resume.educations.map((edu) => (
              <div key={edu.id} className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-sm text-muted">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
                <div className="col-span-2">
                  <h3 className="font-semibold mb-1">{edu.degree}</h3>
                  <p className="text-muted text-sm">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-6 uppercase tracking-widest text-muted">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {resume.skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 border border-border rounded-full text-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-6 uppercase tracking-widest text-muted">Projects</h2>
          <div className="space-y-6">
            {resume.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-semibold mb-1">{proj.title}</h3>
                {proj.description && <p className="text-foreground text-sm leading-relaxed mb-2">{proj.description}</p>}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:underline"
                  >
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
