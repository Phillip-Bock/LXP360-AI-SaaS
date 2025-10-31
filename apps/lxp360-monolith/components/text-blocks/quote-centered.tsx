"use client"

import { useState } from "react"

export function QuoteCentered() {
  const [quote, setQuote] = useState("Live as if you were to die tomorrow. Learn as if you were to live forever.")
  const [author, setAuthor] = useState("Mahatma Gandhi")

  return (
    <div className="text-center">
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setQuote(e.currentTarget.textContent || "")}
        className="text-xl font-medium mb-3 outline-none focus:ring-2 focus:ring-[#70B3FF] rounded"
      >
        "{quote}"
      </p>
      <footer
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setAuthor(e.currentTarget.textContent || "")}
        className="text-[#0072F5] outline-none focus:ring-2 focus:ring-[#70B3FF] rounded"
      >
        — {author}
      </footer>
    </div>
  )
}
