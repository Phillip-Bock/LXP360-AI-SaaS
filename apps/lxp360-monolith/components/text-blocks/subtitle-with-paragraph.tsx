"use client"

import { useState, useRef } from "react"

export function SubtitleWithParagraph() {
  const [subtitleCharCount, setSubtitleCharCount] = useState(0)
  const [paraCharCount, setParaCharCount] = useState(0)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const paraRef = useRef<HTMLDivElement>(null)
  const maxSubtitleChars = 100
  const maxParaChars = 5000

  const updateSubtitleCharCount = () => {
    if (!subtitleRef.current) return
    const text = subtitleRef.current.innerText || ""
    if (text.length > maxSubtitleChars) {
      subtitleRef.current.innerText = text.substring(0, maxSubtitleChars)
      const range = document.createRange()
      const sel = window.getSelection()
      if (sel && subtitleRef.current.childNodes.length > 0) {
        range.selectNodeContents(subtitleRef.current)
        range.collapse(false)
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }
    setSubtitleCharCount(subtitleRef.current.innerText.length)
  }

  const updateParaCharCount = () => {
    if (!paraRef.current) return
    const text = paraRef.current.innerText || ""
    if (text.length > maxParaChars) {
      paraRef.current.innerText = text.substring(0, maxParaChars)
      const range = document.createRange()
      const sel = window.getSelection()
      if (sel && paraRef.current.childNodes.length > 0) {
        range.selectNodeContents(paraRef.current)
        range.collapse(false)
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }
    setParaCharCount(paraRef.current.innerText.length)
  }

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-10 w-full max-w-[800px] mx-auto my-5">
      <h2
        ref={subtitleRef}
        contentEditable
        suppressContentEditableWarning
        onInput={updateSubtitleCharCount}
        className="text-[1.75em] font-semibold text-[#4a5568] m-0 mb-5 p-2.5 outline-none border-2 border-transparent transition-[border-color] duration-300 focus:border-[#667eea]"
      >
        A Subtitle Above the Main Content
      </h2>
      <div
        className="text-right text-[0.9em] mt-2"
        style={{ color: subtitleCharCount >= maxSubtitleChars ? "#e0245e" : "#606770" }}
      >
        <span>{subtitleCharCount}</span> / {maxSubtitleChars}
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "25px 0" }} />

      {/* RTE Toolbar */}
      <div className="flex flex-wrap bg-[#f8f9fa] border border-[#dee2e6] rounded-lg p-1.5 mb-2.5">
        <div className="flex mr-2.5 pr-2.5 border-r border-[#dee2e6]">
          <button title="Bold" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            <b>B</b>
          </button>
          <button title="Italic" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            <i>I</i>
          </button>
          <button title="Underline" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            <u>U</u>
          </button>
          <button title="Strikethrough" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            <s>S</s>
          </button>
        </div>
        <div className="flex mr-2.5 pr-2.5 border-r border-[#dee2e6]">
          <select title="Headings" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            <option>Paragraph</option>
            <option>H1</option>
            <option>H2</option>
            <option>H3</option>
          </select>
        </div>
        <div className="flex mr-2.5 pr-2.5 border-r border-[#dee2e6]">
          <button title="Align Left" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            L
          </button>
          <button title="Align Center" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            C
          </button>
          <button title="Align Right" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            R
          </button>
        </div>
        <div className="flex mr-2.5 pr-2.5 border-r border-[#dee2e6]">
          <button title="Bulleted List" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            •
          </button>
          <button title="Numbered List" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            1.
          </button>
        </div>
        <div className="flex mr-2.5 pr-2.5 border-r border-[#dee2e6]">
          <button title="Insert Link" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            🔗
          </button>
          <button title="Insert Image" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            🖼️
          </button>
          <button title="Insert Video" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
            ▶️
          </button>
        </div>
        <div className="flex">
          <button
            title="Re-write with AI"
            className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]"
          >
            ✨
          </button>
        </div>
      </div>

      <div
        ref={paraRef}
        contentEditable
        suppressContentEditableWarning
        onInput={updateParaCharCount}
        className="min-h-[150px] p-4 border border-[#ced4da] rounded-lg outline-none leading-relaxed focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim
          sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a,
          semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non
          fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a,
          enim. Pellentesque congue.
        </p>
      </div>
      <div
        className="text-right text-[0.9em] mt-2"
        style={{ color: paraCharCount >= maxParaChars ? "#e0245e" : "#606770" }}
      >
        <span>{paraCharCount}</span> / {maxParaChars}
      </div>
    </div>
  )
}
