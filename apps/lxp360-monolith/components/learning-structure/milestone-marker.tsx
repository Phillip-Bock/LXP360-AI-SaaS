"use client"

import { useState } from "react"
import { Flag, CheckCircle2 } from "lucide-react"

export function MilestoneMarker() {
  const [title, setTitle] = useState("Milestone Reached")
  const [description, setDescription] = useState("You've completed a significant portion of your learning journey!")
  const [milestoneNumber, setMilestoneNumber] = useState(1)
  const [totalMilestones, setTotalMilestones] = useState(5)

  return (
    <div className="relative bg-gradient-to-r from-[#dbeafe] via-[#bfdbfe] to-[#dbeafe] rounded-lg p-6 border-2 border-[#3b82f6] shadow-lg overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6] opacity-10 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#3b82f6] opacity-10 rounded-full -ml-12 -mb-12" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#3b82f6] rounded-full p-3 shadow-md">
            <Flag className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setTitle(e.currentTarget.textContent || "")}
              className="mt-0 text-[#1e40af] font-bold text-xl outline-none focus:ring-2 focus:ring-[#3b82f6] rounded px-2"
            >
              {title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-[#1e40af] font-semibold">
                Milestone{" "}
                <input
                  type="number"
                  value={milestoneNumber}
                  onChange={(e) => setMilestoneNumber(Number(e.target.value))}
                  className="w-12 text-center bg-white rounded border border-[#3b82f6] outline-none px-1"
                  min="1"
                />{" "}
                of{" "}
                <input
                  type="number"
                  value={totalMilestones}
                  onChange={(e) => setTotalMilestones(Number(e.target.value))}
                  className="w-12 text-center bg-white rounded border border-[#3b82f6] outline-none px-1"
                  min="1"
                />
              </span>
            </div>
          </div>
          <CheckCircle2 className="w-8 h-8 text-[#10b981] fill-[#10b981]" />
        </div>

        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setDescription(e.currentTarget.textContent || "")}
          className="text-[#1e40af] leading-relaxed outline-none focus:ring-2 focus:ring-[#3b82f6] rounded p-2"
        >
          {description}
        </p>

        <div className="mt-4 bg-white rounded-lg p-3 shadow-sm">
          <div className="flex gap-1">
            {Array.from({ length: totalMilestones }).map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  index < milestoneNumber ? "bg-[#3b82f6]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
