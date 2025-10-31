"use client"

import { useState } from "react"
import { Target, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LearningObjectives() {
  const [objectives, setObjectives] = useState([
    "Understand the core concepts and principles",
    "Apply knowledge to real-world scenarios",
    "Analyze complex problems effectively",
  ])

  const addObjective = () => {
    setObjectives([...objectives, "New learning objective"])
  }

  const removeObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index))
  }

  const updateObjective = (index: number, value: string) => {
    const updated = [...objectives]
    updated[index] = value
    setObjectives(updated)
  }

  return (
    <div className="border-l-4 border-[#10b981] bg-gradient-to-r from-[#ecfdf5] to-white rounded-lg p-6 shadow-sm">
      <h4 className="mt-0 flex items-center gap-2.5 text-[#059669] font-bold text-lg mb-4">
        <Target className="w-6 h-6" />
        Learning Objectives
      </h4>
      <p className="text-sm text-gray-600 mb-4">By the end of this lesson, you will be able to:</p>
      <ul className="space-y-3 mb-4">
        {objectives.map((objective, index) => (
          <li key={index} className="flex items-start gap-2 group">
            <span className="text-[#10b981] mt-1 font-bold">•</span>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateObjective(index, e.currentTarget.textContent || "")}
              className="flex-1 outline-none focus:ring-2 focus:ring-[#10b981] rounded px-2 py-1"
            >
              {objective}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeObjective(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
            >
              <X className="w-4 h-4 text-red-500" />
            </Button>
          </li>
        ))}
      </ul>
      <Button
        onClick={addObjective}
        variant="outline"
        size="sm"
        className="text-[#059669] border-[#10b981] bg-transparent"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Objective
      </Button>
    </div>
  )
}
