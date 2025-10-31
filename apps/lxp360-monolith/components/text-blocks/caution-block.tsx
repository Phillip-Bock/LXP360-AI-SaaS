"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"

export function CautionBlock() {
  const [content, setContent] = useState("Use this block to warn users about potential issues.")

  return (
    <div className="border-l-[5px] border-[#eab308] bg-[#fef9c3] rounded-lg p-5">
      <h4 className="mt-0 flex items-center gap-2.5 text-[#a16207] font-semibold mb-3">
        <AlertTriangle className="w-5 h-5" />
        Caution Block
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
