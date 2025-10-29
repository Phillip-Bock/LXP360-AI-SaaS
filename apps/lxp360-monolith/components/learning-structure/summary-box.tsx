"use client"

import { useState } from "react"
import { FileText } from "lucide-react"

export function SummaryBox() {
  const [title, setTitle] = useState("Lesson Summary")
  const [content, setContent] = useState(
    "This section provides a concise overview of the main points covered in this lesson. Use this space to reinforce key concepts and help learners consolidate their understanding.",
  )

  return (
    <div className="border-2 border-[#0ea5e9] bg-gradient-to-br from-[#e0f2fe] to-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[#0ea5e9]">
        <div className="bg-[#0ea5e9] rounded-lg p-2">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <h4
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setTitle(e.currentTarget.textContent || "")}
          className="mt-0 text-[#0369a1] font-bold text-xl outline-none focus:ring-2 focus:ring-[#0ea5e9] rounded px-2"
        >
          {title}
        </h4>
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setContent(e.currentTarget.textContent || "")}
        className="text-gray-700 leading-relaxed outline-none focus:ring-2 focus:ring-[#0ea5e9] rounded p-2"
      >
        {content}
      </div>
    </div>
  )
}
