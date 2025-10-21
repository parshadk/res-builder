"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { updatePrimaryColor, updateAccentColor } from "@/lib/redux/slices/designSlice"

export function ColorPicker() {
  const dispatch = useDispatch()
  const design = useSelector((state: RootState) => state.design)

  const colors = [
    "#1e40af", // Blue
    "#dc2626", // Red
    "#16a34a", // Green
    "#ea580c", // Orange
    "#7c3aed", // Purple
    "#0891b2", // Cyan
    "#6366f1", // Indigo
    "#0f172a", // Dark
  ]

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-border">
      <h3 className="text-lg font-semibold text-foreground">Colors</h3>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Primary Color</label>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => dispatch(updatePrimaryColor(color))}
              className={`w-10 h-10 rounded-lg border-2 transition-all ${
                design.primaryColor === color ? "border-foreground" : "border-border"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          <input
            type="color"
            value={design.primaryColor}
            onChange={(e) => dispatch(updatePrimaryColor(e.target.value))}
            className="w-10 h-10 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Accent Color</label>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => dispatch(updateAccentColor(color))}
              className={`w-10 h-10 rounded-lg border-2 transition-all ${
                design.accentColor === color ? "border-foreground" : "border-border"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          <input
            type="color"
            value={design.accentColor}
            onChange={(e) => dispatch(updateAccentColor(e.target.value))}
            className="w-10 h-10 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
