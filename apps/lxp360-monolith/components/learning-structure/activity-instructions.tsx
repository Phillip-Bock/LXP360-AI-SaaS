"use client"

import { useState } from "react"
import { ClipboardList, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ActivityInstructions() {
  const [title, setTitle] = useState("Activity: Apply Your Knowledge")
  const [description, setDescription] = useState("Follow these steps to complete the activity:")
  const [steps, setSteps] = useState([
    "Read through the scenario carefully",
    "Identify the key concepts from the lesson",
    "Apply the concepts to solve the problem",
    "Document your findings and reasoning",
  ])

  const addStep = () => {
    setSteps([...steps, "New step"])
  }

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index))
  }

  const updateStep = (index: number, value: string) => {
    const updated = [...steps]
    updated[index] = value
    setSteps(updated)
  }

  return (
    <div className="border-l-4 border-[#6366f1] bg-gradient-to-r from-[#eef2ff] to-white rounded-lg p-6 shadow-sm">
      <h4
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setTitle(e.currentTarget.textContent || "")}
        className="mt-0 flex items-center gap-2.5 text-[#4f46e5] font-bold text-lg mb-3 outline-none focus:ring-2 focus:ring-[#6366f1] rounded px-2"
      >
        <ClipboardList className="w-6 h-6" />
        {title}
      </h4>
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setDescription(e.currentTarget.textContent || "")}
        className="text-gray-700 mb-4 outline-none focus:ring-2 focus:ring-[#6366f1] rounded p-2"
      >
        {description}
      </p>
      <ol className="space-y-3 mb-4">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#6366f1] text-white font-bold text-sm flex-shrink-0 mt-0.5">
              {index + 1}
            </span>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateStep(index, e.currentTarget.textContent || "")}
              className="flex-1 outline-none focus:ring-2 focus:ring-[#6366f1] rounded px-2 py-1"
            >
              {step}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeStep(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
            >
              <X className="w-4 h-4 text-red-500" />
            </Button>
          </li>
        ))}
      </ol>
      <Button onClick={addStep} variant="outline" size="sm" className="text-[#4f46e5] border-[#6366f1] bg-transparent">
        <Plus className="w-4 h-4 mr-1" />
        Add Step
      </Button>
    </div>
  )
}
