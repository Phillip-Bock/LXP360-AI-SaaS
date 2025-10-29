"use client"

import { useState } from "react"

export function TooltipText() {
  const [text, setText] = useState("In e-learning, an")
  const [tooltipWord, setTooltipWord] = useState("LMS")
  const [tooltipDefinition, setTooltipDefinition] = useState("Learning Management System")
  const [restOfText, setRestOfText] = useState("is a crucial piece of software for course delivery and tracking.")
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <p className="leading-relaxed text-gray-700">
      <span contentEditable suppressContentEditableWarning onBlur={(e) => setText(e.currentTarget.textContent || "")}>
        {text}
      </span>{" "}
      <span
        className="border-b-2 border-dotted border-[#479DFF] cursor-help relative inline-block"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setTooltipWord(e.currentTarget.textContent || "")}
        >
          {tooltipWord}
        </span>
        {showTooltip && (
          <span className="absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-[#001D3D] text-white text-center rounded-md px-3 py-2 w-40 z-10 opacity-100 transition-opacity">
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setTooltipDefinition(e.currentTarget.textContent || "")}
            >
              {tooltipDefinition}
            </span>
          </span>
        )}
      </span>{" "}
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setRestOfText(e.currentTarget.textContent || "")}
      >
        {restOfText}
      </span>
    </p>
  )
}
