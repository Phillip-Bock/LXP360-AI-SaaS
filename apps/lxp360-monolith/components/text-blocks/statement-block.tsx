"use client"

import { useState } from "react"
import { Info } from "lucide-react"

export function StatementBlock() {
  const [content, setContent] = useState("This is a standard statement block for general information.")

  return (
    <div className="border-l-[5px] border-[#0072F5] bg-[#f0f5ff] rounded-lg p-5">
      <h4 className="mt-0 flex items-center gap-2.5 text-[#0056B8] font-semibold mb-3">
        <Info className="w-5 h-5" />
        Statement Block
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
