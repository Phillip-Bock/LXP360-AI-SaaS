"use client"

import { useState } from "react"
import { Bell } from "lucide-react"

export function AlertBlock() {
  const [content, setContent] = useState("For time-sensitive or urgent notifications that require attention.")

  return (
    <div className="border-2 border-[#f97316] bg-[#ffedd5] rounded-lg p-5 animate-[flash-orange_1.5s_infinite]">
      <style jsx>{`
        @keyframes flash-orange {
          50% {
            border-color: #fee2d5;
            box-shadow: 0 0 12px #f97316;
          }
        }
      `}</style>
      <h4 className="mt-0 flex items-center gap-2.5 text-[#c2410c] font-semibold mb-3">
        <Bell className="w-5 h-5" />
        Alert Block
      </h4>
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setContent(e.currentTarget.textContent || "")}
        className="outline-none focus:ring-2 focus:ring-[#70B3FF] rounded"
      >
        {content}
      </div>
    </div>
  )
}
