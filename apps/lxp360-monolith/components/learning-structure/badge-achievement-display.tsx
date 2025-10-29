"use client"

import { useState } from "react"
import { Award, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function BadgeAchievementDisplay() {
  const [title, setTitle] = useState("Achievement Unlocked!")
  const [badgeName, setBadgeName] = useState("Lesson Master")
  const [description, setDescription] = useState(
    "You've successfully completed this lesson and demonstrated mastery of the concepts.",
  )
  const [points, setPoints] = useState(100)

  return (
    <div className="bg-gradient-to-br from-[#fef3c7] via-[#fde68a] to-[#fbbf24] rounded-xl p-6 shadow-xl border-2 border-[#f59e0b]">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-full flex items-center justify-center shadow-lg">
            <Award className="w-14 h-14 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
            <Star className="w-6 h-6 text-[#fbbf24] fill-[#fbbf24]" />
          </div>
        </div>
      </div>
      <h4
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setTitle(e.currentTarget.textContent || "")}
        className="text-center text-[#78350f] font-bold text-xl mb-2 outline-none focus:ring-2 focus:ring-[#f59e0b] rounded px-2"
      >
        {title}
      </h4>
      <div className="flex items-center justify-center gap-2 mb-3">
        <Badge className="bg-white text-[#d97706] border-2 border-[#f59e0b] text-lg px-4 py-1">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setBadgeName(e.currentTarget.textContent || "")}
          >
            {badgeName}
          </span>
        </Badge>
      </div>
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setDescription(e.currentTarget.textContent || "")}
        className="text-center text-[#78350f] mb-4 outline-none focus:ring-2 focus:ring-[#f59e0b] rounded p-2"
      >
        {description}
      </p>
      <div className="flex items-center justify-center gap-2 bg-white/50 rounded-lg p-3">
        <Star className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b]" />
        <span className="font-bold text-[#78350f]">
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="w-16 text-center bg-transparent border-b-2 border-[#f59e0b] outline-none"
          />{" "}
          Points Earned
        </span>
      </div>
    </div>
  )
}
