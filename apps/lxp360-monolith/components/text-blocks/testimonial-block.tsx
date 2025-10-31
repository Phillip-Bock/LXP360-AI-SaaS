"use client"

import { useState } from "react"
import Image from "next/image"

export function TestimonialBlock() {
  const [quote, setQuote] = useState(
    "This platform transformed how our team learns. The interactive components are incredibly engaging and effective.",
  )
  const [author, setAuthor] = useState("Jane Doe, Head of L&D")

  return (
    <div className="flex gap-5 items-center bg-[#f0f5ff] p-5 rounded-lg">
      <Image src="/placeholder.svg?height=60&width=60" alt="Avatar" width={60} height={60} className="rounded-full" />
      <div>
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setQuote(e.currentTarget.textContent || "")}
          className="mb-2 outline-none focus:ring-2 focus:ring-[#70B3FF] rounded"
        >
          "{quote}"
        </p>
        <footer
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setAuthor(e.currentTarget.textContent || "")}
          className="outline-none focus:ring-2 focus:ring-[#70B3FF] rounded"
        >
          — {author}
        </footer>
      </div>
    </div>
  )
}
