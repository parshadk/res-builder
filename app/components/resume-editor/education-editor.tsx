"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { addEducation, updateEducation, deleteEducation, reorderEducations } from "@/lib/redux/slices/resumeSlice"
import type { Education } from "@/lib/redux/slices/resumeSlice"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, GripVertical } from "lucide-react"
import { useState } from "react"

export function EducationEditor() {
  const dispatch = useDispatch()
  const educations = useSelector((state: RootState) => state.resume.educations)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
      order: educations.length,
    }
    dispatch(addEducation(newEducation))
  }

  const handleUpdateEducation = (education: Education) => {
    dispatch(updateEducation(education))
  }

  const handleDeleteEducation = (id: string) => {
    dispatch(deleteEducation(id))
  }

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return

    const draggedIndex = educations.findIndex((e) => e.id === targetId)
    const targetIndex = educations.findIndex((e) => e.id === targetId)

    const newEducations = [...educations]
    const [draggedItem] = newEducations.splice(draggedIndex, 1)
    newEducations.splice(targetIndex, 0, draggedItem)

    const reordered = newEducations.map((edu, idx) => ({ ...edu, order: idx }))
    dispatch(reorderEducations(reordered))
    setDraggedId(null)
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-border">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Education</h3>
        <Button onClick={handleAddEducation} size="sm" className="gap-2">
          <Plus size={16} />
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {educations.map((edu) => (
          <div
            key={edu.id}
            draggable
            onDragStart={() => handleDragStart(edu.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(edu.id)}
            className="p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-move"
          >
            <div className="flex gap-2 mb-3">
              <GripVertical size={18} className="text-muted flex-shrink-0 mt-1" />
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="School/University"
                    value={edu.school}
                    onChange={(e) => handleUpdateEducation({ ...edu, school: e.target.value })}
                  />
                  <Input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleUpdateEducation({ ...edu, degree: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => handleUpdateEducation({ ...edu, field: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => handleUpdateEducation({ ...edu, startDate: e.target.value })}
                    />
                    <Input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => handleUpdateEducation({ ...edu, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <Textarea
                  placeholder="Additional details (GPA, honors, etc.)..."
                  value={edu.description}
                  onChange={(e) => handleUpdateEducation({ ...edu, description: e.target.value })}
                  rows={2}
                />
              </div>

              <button
                onClick={() => handleDeleteEducation(edu.id)}
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
