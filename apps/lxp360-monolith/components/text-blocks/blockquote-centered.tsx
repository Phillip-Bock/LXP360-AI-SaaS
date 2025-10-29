"use client"

import { useState } from "react"

export function BlockquoteCentered() {
  const [quote, setQuote] = useState("We open ourselves to discovery by following our deepest questions.")
  const [author, setAuthor] = useState("Jane Hirshfield")

  return (
    <div className="bg-white rounded-xl shadow-md p-10">
      <blockquote className="text-center my-10 max-w-4xl mx-auto">
        <p
          contentEditable
          className="font-serif text-2xl font-bold text-[#2d3748] outline-none focus:ring-2 focus:ring-[#a3bffa] rounded p-2"
          onInput={(e) => setQuote(e.currentTarget.textContent || "")}
          suppressContentEditableWarning
        >
          {quote}
        </p>
        <footer
          contentEditable
          className="mt-4 text-base italic text-[#667eea] outline-none focus:ring-2 focus:ring-[#a3bffa] rounded p-2"
          onInput={(e) => setAuthor(e.currentTarget.textContent || "")}
          suppressContentEditableWarning
        >
          — {author}
        </footer>
      </blockquote>
    </div>
  )
}
