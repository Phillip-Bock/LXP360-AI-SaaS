"use client"

import { useState } from "react"

export function QuoteLeftAligned() {
  const [quote, setQuote] = useState("The art of teaching is the art of assisting discovery.")
  const [author, setAuthor] = useState("Mark Van Doren")

  return (
    <div className="border-l-4 border-[#0072F5] pl-5 italic text-[#4a5568]">
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setQuote(e.currentTarget.textContent || "")}
        className="outline-none focus:ring-2 focus:ring-[#70B3FF] rounded mb-2"
      >
        "{quote}"
      </p>
      <footer
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setAuthor(e.currentTarget.textContent || "")}
        className="outline-none focus:ring-2 focus:ring-[#70B3FF] rounded not-italic"
      >
        — {author}
      </footer>
    </div>
  )
}
