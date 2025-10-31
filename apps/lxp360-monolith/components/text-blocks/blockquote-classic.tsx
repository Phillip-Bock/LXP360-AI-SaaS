"use client"

import { useState } from "react"

export function BlockquoteClassic() {
  const [quote, setQuote] = useState(
    "It is in vain to say human beings ought to be satisfied with tranquillity: they must have action; and they will make it if they cannot find it.",
  )
  const [author, setAuthor] = useState("Charlotte Brontë, Jane Eyre")

  return (
    <div className="bg-white rounded-xl shadow-md p-10">
      <blockquote className="border-l-4 border-[#667eea] pl-5 my-8 text-[#4a5568]">
        <p
          contentEditable
          className="font-serif italic text-lg outline-none focus:ring-2 focus:ring-[#a3bffa] rounded p-2"
          onInput={(e) => setQuote(e.currentTarget.textContent || "")}
          suppressContentEditableWarning
        >
          {quote}
        </p>
        <footer
          contentEditable
          className="mt-3 text-sm text-[#718096] outline-none focus:ring-2 focus:ring-[#a3bffa] rounded p-2"
          onInput={(e) => setAuthor(e.currentTarget.textContent || "")}
          suppressContentEditableWarning
        >
          — {author}
        </footer>
      </blockquote>
    </div>
  )
}
