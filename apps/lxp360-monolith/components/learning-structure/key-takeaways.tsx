"use client"

import { useState } from "react"
import { Lightbulb, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function KeyTakeaways() {
  const [takeaways, setTakeaways] = useState([
    "Main concept or principle covered",
    "Key insight or learning point",
    "Practical application or next step",
  ])

  const addTakeaway = () => {
    setTakeaways([...takeaways, "New key takeaway"])
  }

  const removeTakeaway = (index: number) => {
    setTakeaways(takeaways.filter((_, i) => i !== index))
  }

  const updateTakeaway = (index: number, value: string) => {
    const updated = [...takeaways]
    updated[index] = value
    setTakeaways(updated)
  }

  return (
    <div className="border-2 border-[#8b5cf6] bg-gradient-to-br from-[#f5f3ff] to-[#faf5ff] rounded-lg p-6 shadow-md">
      <h4 className="mt-0 flex items-center gap-2.5 text-[#7c3aed] font-bold text-lg mb-4">
        <Lightbulb className="w-6 h-6 fill-[#fbbf24]" />
        Key Takeaways
      </h4>
      <div className="space-y-3 mb-4">
        {takeaways.map((takeaway, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm border border-[#e9d5ff] group"
          >
            <span className="text-[#8b5cf6] font-bold text-lg mt-0.5">{index + 1}.</span>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateTakeaway(index, e.currentTarget.textContent || "")}
              className="flex-1 outline-none focus:ring-2 focus:ring-[#8b5cf6] rounded px-2 py-1"
            >
              {takeaway}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeTakeaway(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
            >
              <X className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        onClick={addTakeaway}
        variant="outline"
        size="sm"
        className="text-[#7c3aed] border-[#8b5cf6] bg-transparent"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Takeaway
      </Button>
    </div>
  )
}
