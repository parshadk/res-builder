"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { Mail, Phone, MapPin } from "lucide-react"

export function ModernTemplate() {
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
      ref={(el) => {
        if (el) {
          el.style.setProperty("--primary-color", design.primaryColor)
          el.style.setProperty("--accent-color", design.accentColor)
        }
      }}
      className="w-full bg-white p-12 text-foreground"
      style={{
        fontFamily: design.fontFamily === "inter" ? "Inter, sans-serif" : "Georgia, serif",
      }}
    >
      {/* Header */}
      <div className="mb-8 pb-8 border-b-2" style={{ borderColor: design.primaryColor }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: design.primaryColor }}>
          {resume.fullName}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          {resume.email && (
            <div className="flex items-center gap-1">
              <Mail size={14} />
              {resume.email}
            </div>
          )}
          {resume.phone && (
            <div className="flex items-center gap-1">
              <Phone size={14} />
              {resume.phone}
            </div>
          )}
          {resume.location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {resume.location}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: design.primaryColor }}>
            Professional Summary
          </h2>
          <p className="text-foreground leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: design.primaryColor }}>
            Experience
          </h2>
          <div className="space-y-6">
            {resume.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                    <p className="text-muted">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted whitespace-nowrap ml-4">
                    {formatDate(exp.startDate)} - {exp.isCurrently ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.location && <p className="text-sm text-muted mb-2">{exp.location}</p>}
                {exp.description && <p className="text-foreground leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.educations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: design.primaryColor }}>
            Education
          </h2>
          <div className="space-y-4">
            {resume.educations.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-muted">{edu.school}</p>
                  </div>
                  <span className="text-sm text-muted whitespace-nowrap ml-4">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.field && <p className="text-sm text-foreground mb-1">{edu.field}</p>}
                {edu.description && <p className="text-sm text-foreground">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: design.primaryColor }}>
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {resume.skills.map((skill) => (
              <div key={skill.id} className="flex justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-muted text-sm">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: design.primaryColor }}>
            Projects
          </h2>
          <div className="space-y-4">
            {resume.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-bold">{proj.title}</h3>
                {proj.description && <p className="text-foreground leading-relaxed mb-1">{proj.description}</p>}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm"
                    style={{ color: design.primaryColor }}
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
