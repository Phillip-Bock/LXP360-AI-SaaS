"use client"

import { useState, useRef } from "react"

export function TitleOnly() {
  const [charCount, setCharCount] = useState(0)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const maxChars = 100

  const updateCharCount = () => {
    if (!titleRef.current) return
    const text = titleRef.current.innerText || titleRef.current.textContent || ""

    if (text.length > maxChars) {
      titleRef.current.innerText = text.substring(0, maxChars)
      // Move cursor to end
      const range = document.createRange()
      const sel = window.getSelection()
      if (sel && titleRef.current.childNodes.length > 0) {
        range.selectNodeContents(titleRef.current)
        range.collapse(false)
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }

    setCharCount(titleRef.current.innerText.length)
  }

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-10 w-full max-w-[800px] mx-auto my-5">
      <h1
        ref={titleRef}
        contentEditable
        suppressContentEditableWarning
        onInput={updateCharCount}
        className="text-[2.5em] font-bold m-0 p-2.5 outline-none border-2 border-transparent transition-[border-color] duration-300 focus:border-[#667eea]"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      >
        Lorem Ipsum Dolor Sit Amet
      </h1>
      <div className="text-right text-[0.9em] mt-2" style={{ color: charCount >= maxChars ? "#e0245e" : "#606770" }}>
        <span>{charCount}</span> / {maxChars}
      </div>
    </div>
  )
}
