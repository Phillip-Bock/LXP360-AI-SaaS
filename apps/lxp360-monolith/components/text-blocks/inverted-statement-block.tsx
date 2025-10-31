"use client"

import { useState } from "react"
import { Star } from "lucide-react"

export function InvertedStatementBlock() {
  const [content, setContent] = useState("A high-contrast block for key takeaways.")

  return (
    <div className="border-l-[5px] border-[#70B3FF] bg-[#003066] text-white rounded-lg p-5">
      <h4 className="mt-0 flex items-center gap-2.5 text-white font-semibold mb-3">
        <Star className="w-5 h-5" />
        Inverted Statement
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
