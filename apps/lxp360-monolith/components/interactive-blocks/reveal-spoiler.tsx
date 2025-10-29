"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function RevealSpoiler() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [buttonText, setButtonText] = useState("Click to Reveal")
  const [content, setContent] = useState(
    "This is the hidden spoiler content. Use it for answers to questions or supplementary details.",
  )

  return (
    <div>
      <button
        onClick={() => setIsRevealed(!isRevealed)}
        className="w-full flex justify-between items-center py-4 px-5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setButtonText(e.currentTarget.textContent || "")}
          className="font-medium text-gray-800"
        >
          {buttonText}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isRevealed ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isRevealed ? "max-h-96 mt-3" : "max-h-0"}`}>
        <div className="border border-gray-200 rounded-lg p-4">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setContent(e.currentTarget.textContent || "")}
            className="leading-relaxed text-gray-700"
          >
            {content}
          </p>
        </div>
      </div>
    </div>
  )
}
