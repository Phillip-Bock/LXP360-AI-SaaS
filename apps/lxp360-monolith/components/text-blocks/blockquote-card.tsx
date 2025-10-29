"use client"

import { useState } from "react"

export function BlockquoteCard() {
  const [quote, setQuote] = useState(
    "By all means, write your to-do list. But then scrap your well-thought out plan when your intuition whispers, 'This way.'",
  )
  const [author, setAuthor] = useState("Danielle LaPorte, The Fire Starter Sessions")

  return (
    <div className="bg-white rounded-xl shadow-md p-10">
      <blockquote className="my-10 border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden">
        <p
          contentEditable
          className="p-6 text-lg bg-white outline-none focus:ring-2 focus:ring-[#a3bffa]"
          onInput={(e) => setQuote(e.currentTarget.textContent || "")}
          suppressContentEditableWarning
        >
          {quote}
        </p>
        <footer
          contentEditable
          className="px-6 py-4 bg-[#f8f9fa] text-sm font-medium text-[#4a5568] text-right outline-none focus:ring-2 focus:ring-[#a3bffa]"
          onInput={(e) => setAuthor(e.currentTarget.textContent || "")}
          suppressContentEditableWarning
        >
          — {author}
        </footer>
      </blockquote>
    </div>
  )
}
