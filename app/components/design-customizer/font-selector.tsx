"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { updateFontFamily } from "@/lib/redux/slices/designSlice"

export function FontSelector() {
  const dispatch = useDispatch()
  const design = useSelector((state: RootState) => state.design)

  const fonts = [
    { id: "inter", name: "Inter", family: "Inter, sans-serif" },
    { id: "georgia", name: "Georgia", family: "Georgia, serif" },
  ]

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-border">
      <h3 className="text-lg font-semibold text-foreground">Font</h3>

      <div className="space-y-2">
        {fonts.map((font) => (
          <button
            key={font.id}
            onClick={() => dispatch(updateFontFamily(font.id))}
            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
              design.fontFamily === font.id ? "border-primary bg-blue-50" : "border-border hover:border-primary"
            }`}
            style={{ fontFamily: font.family }}
          >
            <span className="font-semibold">{font.name}</span>
            <p className="text-sm text-muted">The quick brown fox jumps over the lazy dog</p>
          </button>
        ))}
      </div>
    </div>
  )
}
