"use client"

import { useState } from "react"
import { Skull } from "lucide-react"

export function DangerBlock() {
  const [content, setContent] = useState("Reserved for critical information where there is a risk of severe problems.")

  return (
    <div className="border-2 border-[#ef4444] bg-[#fee2e2] rounded-lg p-5 animate-[flash-red_1.5s_infinite]">
      <style jsx>{`
        @keyframes flash-red {
          50% {
            border-color: #fee2e2;
            box-shadow: 0 0 12px #ef4444;
          }
        }
      `}</style>
      <h4 className="mt-0 flex items-center gap-2.5 text-[#b91c1c] font-semibold mb-3">
        <Skull className="w-5 h-5" />
        Danger Block
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
