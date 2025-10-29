"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"

export function NoteBlock() {
  const [content, setContent] = useState("Use this for important, bolded information.")

  return (
    <div className="border-l-[5px] border-[#1a202c] bg-[#f8f9fa] rounded-lg p-5">
      <h4 className="mt-0 flex items-center gap-2.5 text-[#1a202c] font-semibold mb-3">
        <Pencil className="w-5 h-5" />
        Note Block
      </h4>
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setContent(e.currentTarget.textContent || "")}
        className="outline-none focus:ring-2 focus:ring-[#70B3FF] rounded"
      >
        <strong>Note:</strong> {content}
      </div>
    </div>
  )
}
