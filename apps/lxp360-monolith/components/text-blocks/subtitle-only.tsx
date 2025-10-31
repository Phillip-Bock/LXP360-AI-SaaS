"use client"

import { useState, useRef } from "react"

export function SubtitleOnly() {
  const [charCount, setCharCount] = useState(0)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const maxChars = 100

  const updateCharCount = () => {
    if (!subtitleRef.current) return
    const text = subtitleRef.current.innerText || subtitleRef.current.textContent || ""

    if (text.length > maxChars) {
      subtitleRef.current.innerText = text.substring(0, maxChars)
      const range = document.createRange()
      const sel = window.getSelection()
      if (sel && subtitleRef.current.childNodes.length > 0) {
        range.selectNodeContents(subtitleRef.current)
        range.collapse(false)
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }

    setCharCount(subtitleRef.current.innerText.length)
  }

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-10 w-full max-w-[800px] mx-auto my-5">
      <h2
        ref={subtitleRef}
        contentEditable
        suppressContentEditableWarning
        onInput={updateCharCount}
        className="text-[1.75em] font-semibold text-[#4a5568] m-0 p-2.5 outline-none border-2 border-transparent transition-[border-color] duration-300 focus:border-[#667eea]"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      >
        Consectetur adipiscing elit
      </h2>
      <div className="text-right text-[0.9em] mt-2" style={{ color: charCount >= maxChars ? "#e0245e" : "#606770" }}>
        <span>{charCount}</span> / {maxChars}
      </div>
    </div>
  )
}
