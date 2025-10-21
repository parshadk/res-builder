"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { setTemplate } from "@/lib/redux/slices/resumeSlice"
import { Button } from "@/components/ui/button"

export function TemplateSwitcher() {
  const dispatch = useDispatch()
  const template = useSelector((state: RootState) => state.resume.template)

  const templates = [
    { id: "modern", name: "Modern" },
    { id: "minimal", name: "Minimal" },
  ]

  return (
    <div className="flex gap-2">
      {templates.map((t) => (
        <Button
          key={t.id}
          onClick={() => dispatch(setTemplate(t.id))}
          variant={template === t.id ? "default" : "outline"}
          size="sm"
        >
          {t.name}
        </Button>
      ))}
    </div>
  )
}
