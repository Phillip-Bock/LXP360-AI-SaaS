"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"

export function SuccessBlock() {
  const [content, setContent] = useState("Great for positive reinforcement, tips, or successful outcomes.")

  return (
    <div className="border-l-[5px] border-[#22c55e] bg-[#dcfce7] rounded-lg p-5">
      <h4 className="mt-0 flex items-center gap-2.5 text-[#15803d] font-semibold mb-3">
        <CheckCircle className="w-5 h-5" />
        Success / Tip Block
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
