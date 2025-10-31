"use client"

import { useState } from "react"
import { UserCheck } from "lucide-react"

export function ExpertInsightBlock() {
  const [content, setContent] = useState(
    "According to industry experts, micro-interactions in e-learning can boost retention rates by up to 25%.",
  )

  return (
    <div className="border-2 border-dashed border-[#0056B8] rounded-lg p-[18px]">
      <h4 className="mt-0 flex items-center gap-2.5 text-[#00438F] font-semibold mb-3">
        <UserCheck className="w-5 h-5" />
        Expert Insight
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
