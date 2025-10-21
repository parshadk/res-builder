"use client"

import { useState, useEffect } from "react"
import { PersonalInfoEditor } from "@/components/resume-editor/personal-info-editor"
import { ExperienceEditor } from "@/components/resume-editor/experience-editor"
import { EducationEditor } from "@/components/resume-editor/education-editor"
import { SkillsEditor } from "@/components/resume-editor/skills-editor"
import { ProjectsEditor } from "@/components/resume-editor/projects-editor"
import { ModernTemplate } from "@/components/resume-preview/modern-template"
import { MinimalTemplate } from "@/components/resume-preview/minimal-template"
import { ColorPicker } from "@/components/design-customizer/color-picker"
import { FontSelector } from "@/components/design-customizer/font-selector"
import { UndoRedo } from "@/components/toolbar/undo-redo"
import { TemplateSwitcher } from "@/components/toolbar/template-switcher"
import { ExportShare } from "@/components/toolbar/export-share"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { useHistory } from "@/hooks/use-history"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"edit" | "design">("edit")
  const template = useSelector((state: RootState) => state.resume.template)
  const dispatch = useDispatch()
  const resume = useSelector((state: RootState) => state.resume)

  useHistory()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault()
        dispatch({ type: "history/undo" })
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.shiftKey && e.key === "z"))) {
        e.preventDefault()
        dispatch({ type: "history/redo" })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
          <div className="flex gap-4 items-center">
            <TemplateSwitcher />
            <UndoRedo />
            <ExportShare />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Editor */}
          <div className="lg:col-span-1">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 border border-border">
              <button
                onClick={() => setActiveTab("edit")}
                className={`flex-1 px-4 py-2 rounded transition-colors ${
                  activeTab === "edit" ? "bg-primary text-white" : "text-foreground hover:bg-gray-100"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setActiveTab("design")}
                className={`flex-1 px-4 py-2 rounded transition-colors ${
                  activeTab === "design" ? "bg-primary text-white" : "text-foreground hover:bg-gray-100"
                }`}
              >
                Design
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {activeTab === "edit" ? (
                <>
                  <PersonalInfoEditor />
                  <ExperienceEditor />
                  <EducationEditor />
                  <SkillsEditor />
                  <ProjectsEditor />
                </>
              ) : (
                <>
                  <ColorPicker />
                  <FontSelector />
                </>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            <div id="resume-preview" className="bg-white rounded-lg shadow-lg overflow-hidden border border-border">
              {template === "modern" ? <ModernTemplate /> : <MinimalTemplate />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
