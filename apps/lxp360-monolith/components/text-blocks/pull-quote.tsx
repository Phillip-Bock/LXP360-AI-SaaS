"use client"

import { useState } from "react"

export function PullQuote() {
  const [quote, setQuote] = useState(
    "Eu est quot porro legimus, ne elitr aliquam menandri duo, quo dictas vituperata ut. Ei mei tale expetendis.",
  )

  return (
    <div className="bg-white rounded-xl shadow-md p-10">
      <div className="relative pl-10 pr-6 py-5 border-l-4 border-[#667eea] bg-[#f8f9fa] rounded-r-lg">
        <div className="absolute -top-2 left-2 text-8xl text-[#dbe1f9] font-serif leading-none">"</div>
        <p
          contentEditable
          className="relative z-10 text-2xl italic font-serif text-[#2d3748] leading-relaxed outline-none focus:ring-2 focus:ring-[#a3bffa] rounded p-2"
          onInput={(e) => {
            setQuote(e.currentTarget.textContent || "")
          }}
          suppressContentEditableWarning
        >
          {quote}
        </p>
      </div>
    </div>
  )
}
