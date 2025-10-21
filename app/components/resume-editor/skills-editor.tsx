"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { addSkill, updateSkill, deleteSkill, reorderSkills } from "@/lib/redux/slices/resumeSlice"
import type { Skill } from "@/lib/redux/slices/resumeSlice"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, GripVertical } from "lucide-react"
import { useState } from "react"

export function SkillsEditor() {
  const dispatch = useDispatch()
  const skills = useSelector((state: RootState) => state.resume.skills)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermediate",
      order: skills.length,
    }
    dispatch(addSkill(newSkill))
  }

  const handleUpdateSkill = (skill: Skill) => {
    dispatch(updateSkill(skill))
  }

  const handleDeleteSkill = (id: string) => {
    dispatch(deleteSkill(id))
  }

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return

    const draggedIndex = skills.findIndex((s) => s.id === draggedId)
    const targetIndex = skills.findIndex((s) => s.id === targetId)

    const newSkills = [...skills]
    const [draggedItem] = newSkills.splice(draggedIndex, 1)
    newSkills.splice(targetIndex, 0, draggedItem)

    const reordered = newSkills.map((skill, idx) => ({ ...skill, order: idx }))
    dispatch(reorderSkills(reordered))
    setDraggedId(null)
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-border">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Skills</h3>
        <Button onClick={handleAddSkill} size="sm" className="gap-2">
          <Plus size={16} />
          Add Skill
        </Button>
      </div>

      <div className="space-y-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            draggable
            onDragStart={() => handleDragStart(skill.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(skill.id)}
            className="flex gap-2 items-center p-3 border border-border rounded-lg hover:border-primary transition-colors cursor-move"
          >
            <GripVertical size={16} className="text-muted flex-shrink-0" />
            <Input
              placeholder="Skill name"
              value={skill.name}
              onChange={(e) => handleUpdateSkill({ ...skill, name: e.target.value })}
              className="flex-1"
            />
            <select
              value={skill.level}
              onChange={(e) => handleUpdateSkill({ ...skill, level: e.target.value })}
              className="px-3 py-2 border border-border rounded-md text-sm"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
            <button
              onClick={() => handleDeleteSkill(skill.id)}
              className="text-error hover:bg-red-50 p-2 rounded transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
