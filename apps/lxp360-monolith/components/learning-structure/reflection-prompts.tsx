"use client"

import { useState } from "react"
import { MessageCircle, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ReflectionPrompts() {
  const [prompts, setPrompts] = useState([
    "How does this concept relate to your previous knowledge or experience?",
    "What was the most challenging aspect of this lesson for you?",
    "How might you apply what you've learned in a real-world situation?",
  ])

  const addPrompt = () => {
    setPrompts([...prompts, "New reflection question"])
  }

  const removePrompt = (index: number) => {
    setPrompts(prompts.filter((_, i) => i !== index))
  }

  const updatePrompt = (index: number, value: string) => {
    const updated = [...prompts]
    updated[index] = value
    setPrompts(updated)
  }

  return (
    <div className="border-2 border-[#ec4899] bg-gradient-to-br from-[#fdf2f8] to-white rounded-lg p-6 shadow-md">
      <h4 className="mt-0 flex items-center gap-2.5 text-[#db2777] font-bold text-lg mb-4">
        <MessageCircle className="w-6 h-6" />
        Reflection Prompts
      </h4>
      <p className="text-sm text-gray-600 mb-4">Take a moment to reflect on your learning:</p>
      <div className="space-y-4 mb-4">
        {prompts.map((prompt, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-[#fbcfe8] group">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-[#ec4899] font-bold">Q{index + 1}:</span>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updatePrompt(index, e.currentTarget.textContent || "")}
                className="flex-1 outline-none focus:ring-2 focus:ring-[#ec4899] rounded px-2 py-1 font-medium"
              >
                {prompt}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePrompt(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
              >
                <X className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <Textarea placeholder="Your reflection..." className="mt-2 min-h-20 resize-none" />
          </div>
        ))}
      </div>
      <Button
        onClick={addPrompt}
        variant="outline"
        size="sm"
        className="text-[#db2777] border-[#ec4899] bg-transparent"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Prompt
      </Button>
    </div>
  )
}
