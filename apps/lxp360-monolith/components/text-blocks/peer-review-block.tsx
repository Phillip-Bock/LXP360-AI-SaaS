"use client"

import { useState } from "react"
import { Users } from "lucide-react"

export function PeerReviewBlock() {
  const [content, setContent] = useState(
    "A fellow learner noted that the timeline component was particularly helpful for visualizing historical context.",
  )

  return (
    <div className="border-l-[5px] border-[#0072F5] bg-[#f0f5ff] rounded-lg p-5">
      <h4 className="mt-0 flex items-center gap-2.5 text-[#0056B8] font-semibold mb-3">
        <Users className="w-5 h-5" />
        Peer Review
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
