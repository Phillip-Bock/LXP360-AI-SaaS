"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"

export function WarningBlock() {
  const [content, setContent] = useState("For more serious warnings where mistakes could have consequences.")

  return (
    <div className="border-l-[5px] border-[#ef4444] bg-[#fee2e2] rounded-lg p-5">
      <h4 className="mt-0 flex items-center gap-2.5 text-[#b91c1c] font-semibold mb-3">
        <AlertCircle className="w-5 h-5" />
        Warning Block
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
