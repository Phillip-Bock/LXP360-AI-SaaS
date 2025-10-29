"use client"

import { useState } from "react"

export function BlockquoteLargeMarks() {
  const [quote, setQuote] = useState(
    "The future has yet to unfold. But the now is full of beauty simply waiting for our attention.",
  )
  const [author, setAuthor] = useState("Thich Nhat Hanh")

  return (
    <div className="bg-white rounded-xl shadow-md p-10">
      <blockquote className="relative px-10 py-5 my-10 bg-[#f0f4ff] rounded-lg">
        <div className="absolute -top-5 left-0 text-9xl text-[#c3dafe] leading-none">"</div>
        <p
          contentEditable
          className="relative z-10 text-lg text-[#1a202c] outline-none focus:ring-2 focus:ring-[#a3bffa] rounded p-2"
          onInput={(e) => setQuote(e.currentTarget.textContent || "")}
          suppressContentEditableWarning
        >
          {quote}
        </p>
        <footer
          contentEditable
          className="text-right mt-3 font-semibold text-[#4338ca] outline-none focus:ring-2 focus:ring-[#a3bffa] rounded p-2"
          onInput={(e) => setAuthor(e.currentTarget.textContent || "")}
          suppressContentEditableWarning
        >
          — {author}
        </footer>
      </blockquote>
    </div>
  )
}
