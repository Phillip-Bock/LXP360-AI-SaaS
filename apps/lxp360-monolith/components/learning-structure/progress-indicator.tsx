"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function ProgressIndicator() {
  const [progress, setProgress] = useState(65)
  const [label, setLabel] = useState("Lesson Progress")

  return (
    <div className="bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] rounded-lg p-6 border border-[#bae6fd]">
      <div className="flex items-center justify-between mb-3">
        <h4
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setLabel(e.currentTarget.textContent || "")}
          className="mt-0 flex items-center gap-2 text-[#0369a1] font-semibold outline-none focus:ring-2 focus:ring-[#0ea5e9] rounded px-2"
        >
          <TrendingUp className="w-5 h-5" />
          {label}
        </h4>
        <span className="text-2xl font-bold text-[#0369a1]">{progress}%</span>
      </div>
      <Progress value={progress} className="h-3 mb-3" />
      <div className="flex gap-2">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="flex-1 accent-[#0ea5e9]"
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">Adjust the slider to set progress level</p>
    </div>
  )
}
