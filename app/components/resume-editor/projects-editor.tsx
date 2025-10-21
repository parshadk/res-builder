"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { addProject, updateProject, deleteProject, reorderProjects } from "@/lib/redux/slices/resumeSlice"
import type { Project } from "@/lib/redux/slices/resumeSlice"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, GripVertical } from "lucide-react"
import { useState } from "react"

export function ProjectsEditor() {
  const dispatch = useDispatch()
  const projects = useSelector((state: RootState) => state.resume.projects)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "",
      description: "",
      link: "",
      order: projects.length,
    }
    dispatch(addProject(newProject))
  }

  const handleUpdateProject = (project: Project) => {
    dispatch(updateProject(project))
  }

  const handleDeleteProject = (id: string) => {
    dispatch(deleteProject(id))
  }

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return

    const draggedIndex = projects.findIndex((p) => p.id === draggedId)
    const targetIndex = projects.findIndex((p) => p.id === targetId)

    const newProjects = [...projects]
    const [draggedItem] = newProjects.splice(draggedIndex, 1)
    newProjects.splice(targetIndex, 0, draggedItem)

    const reordered = newProjects.map((proj, idx) => ({ ...proj, order: idx }))
    dispatch(reorderProjects(reordered))
    setDraggedId(null)
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-border">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Projects</h3>
        <Button onClick={handleAddProject} size="sm" className="gap-2">
          <Plus size={16} />
          Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            draggable
            onDragStart={() => handleDragStart(proj.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(proj.id)}
            className="p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-move"
          >
            <div className="flex gap-2 mb-3">
              <GripVertical size={18} className="text-muted flex-shrink-0 mt-1" />
              <div className="flex-1 space-y-3">
                <Input
                  placeholder="Project Title"
                  value={proj.title}
                  onChange={(e) => handleUpdateProject({ ...proj, title: e.target.value })}
                />

                <Textarea
                  placeholder="Project description..."
                  value={proj.description}
                  onChange={(e) => handleUpdateProject({ ...proj, description: e.target.value })}
                  rows={3}
                />

                <Input
                  placeholder="Project link (optional)"
                  value={proj.link}
                  onChange={(e) => handleUpdateProject({ ...proj, link: e.target.value })}
                />
              </div>

              <button
                onClick={() => handleDeleteProject(proj.id)}
                className="text-error hover:bg-red-50 p-2 rounded transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
