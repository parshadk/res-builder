"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { updatePersonalInfo } from "@/lib/redux/slices/resumeSlice"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function PersonalInfoEditor() {
  const dispatch = useDispatch()
  const resume = useSelector((state: RootState) => state.resume)

  const handleChange = (field: string, value: string) => {
    dispatch(updatePersonalInfo({ [field]: value }))
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-border">
      <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
          <Input
            value={resume.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email</label>
          <Input
            type="email"
            value={resume.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
          <Input
            value={resume.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Location</label>
          <Input
            value={resume.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Professional Summary</label>
        <Textarea
          value={resume.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Brief overview of your professional background and goals..."
          rows={4}
        />
      </div>
    </div>
  )
}
