"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { addExperience, updateExperience, deleteExperience, reorderExperiences } from "@/lib/redux/slices/resumeSlice"
import type { Experience } from "@/lib/redux/slices/resumeSlice"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, GripVertical } from "lucide-react"
import { useState } from "react"

export function ExperienceEditor() {
  const dispatch = useDispatch()
  const experiences = useSelector((state: RootState) => state.resume.experiences)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrently: false,
      description: "",
      order: experiences.length,
    }
    dispatch(addExperience(newExperience))
  }

  const handleUpdateExperience = (experience: Experience) => {
    dispatch(updateExperience(experience))
  }

  const handleDeleteExperience = (id: string) => {
    dispatch(deleteExperience(id))
  }

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return

    const draggedIndex = experiences.findIndex((e) => e.id === draggedId)
    const targetIndex = experiences.findIndex((e) => e.id === targetId)

    const newExperiences = [...experiences]
    const [draggedItem] = newExperiences.splice(draggedIndex, 1)
    newExperiences.splice(targetIndex, 0, draggedItem)

    const reordered = newExperiences.map((exp, idx) => ({ ...exp, order: idx }))
    dispatch(reorderExperiences(reordered))
    setDraggedId(null)
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-border">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Experience</h3>
        <Button onClick={handleAddExperience} size="sm" className="gap-2">
          <Plus size={16} />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            draggable
            onDragStart={() => handleDragStart(exp.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(exp.id)}
            className="p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-move"
          >
            <div className="flex gap-2 mb-3">
              <GripVertical size={18} className="text-muted flex-shrink-0 mt-1" />
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Job Title"
                    value={exp.jobTitle}
                    onChange={(e) => handleUpdateExperience({ ...exp, jobTitle: e.target.value })}
                  />
                  <Input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience({ ...exp, company: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Location"
                    value={exp.location}
                    onChange={(e) => handleUpdateExperience({ ...exp, location: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleUpdateExperience({ ...exp, startDate: e.target.value })}
                    />
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleUpdateExperience({ ...exp, endDate: e.target.value })}
                      disabled={exp.isCurrently}
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exp.isCurrently}
                    onChange={(e) => handleUpdateExperience({ ...exp, isCurrently: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-foreground">Currently working here</span>
                </label>

                <Textarea
                  placeholder="Job description and achievements..."
                  value={exp.description}
                  onChange={(e) => handleUpdateExperience({ ...exp, description: e.target.value })}
                  rows={3}
                />
              </div>

              <button
                onClick={() => handleDeleteExperience(exp.id)}
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
