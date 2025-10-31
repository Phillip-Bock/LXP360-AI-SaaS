"use client"

import { useState } from "react"
import { BookOpen, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Prerequisites() {
  const [prerequisites, setPrerequisites] = useState([
    "Basic understanding of the subject matter",
    "Completion of previous module or course",
  ])

  const addPrerequisite = () => {
    setPrerequisites([...prerequisites, "New prerequisite"])
  }

  const removePrerequisite = (index: number) => {
    setPrerequisites(prerequisites.filter((_, i) => i !== index))
  }

  const updatePrerequisite = (index: number, value: string) => {
    const updated = [...prerequisites]
    updated[index] = value
    setPrerequisites(updated)
  }

  return (
    <div className="border-l-4 border-[#f59e0b] bg-gradient-to-r from-[#fef3c7] to-white rounded-lg p-6 shadow-sm">
      <h4 className="mt-0 flex items-center gap-2.5 text-[#d97706] font-bold text-lg mb-4">
        <BookOpen className="w-6 h-6" />
        Prerequisites
      </h4>
      <p className="text-sm text-gray-600 mb-4">Before starting this lesson, you should have:</p>
      <ul className="space-y-3 mb-4">
        {prerequisites.map((prerequisite, index) => (
          <li key={index} className="flex items-start gap-2 group">
            <span className="text-[#f59e0b] mt-1 font-bold">✓</span>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updatePrerequisite(index, e.currentTarget.textContent || "")}
              className="flex-1 outline-none focus:ring-2 focus:ring-[#f59e0b] rounded px-2 py-1"
            >
              {prerequisite}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removePrerequisite(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
            >
              <X className="w-4 h-4 text-red-500" />
            </Button>
          </li>
        ))}
      </ul>
      <Button
        onClick={addPrerequisite}
        variant="outline"
        size="sm"
        className="text-[#d97706] border-[#f59e0b] bg-transparent"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Prerequisite
      </Button>
    </div>
  )
}
