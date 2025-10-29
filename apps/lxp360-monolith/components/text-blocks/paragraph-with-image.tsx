"use client"

import { useState, useRef } from "react"
import Image from "next/image"

export default function ParagraphWithImage() {
  const [layout, setLayout] = useState<"left" | "center" | "right">("center")
  const [charCount, setCharCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const paraRef = useRef<HTMLDivElement>(null)
  const maxChars = 500

  const updateCharCount = () => {
    if (!paraRef.current) return
    const text = paraRef.current.innerText || ""
    if (text.length > maxChars) {
      paraRef.current.innerText = text.substring(0, maxChars)
    }
    setCharCount(paraRef.current.innerText.length)
  }

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-10 w-full max-w-[900px] mx-auto my-5">
      <div className="text-center mb-5">
        <label className="mr-2.5">Image Position:</label>
        <button
          onClick={() => setLayout("left")}
          className={`${layout === "left" ? "bg-[#667eea] text-white" : "bg-[#e0e7ff] text-[#4338ca]"} border-2 border-transparent px-4 py-2 rounded-[20px] cursor-pointer transition-all mr-2`}
        >
          Left
        </button>
        <button
          onClick={() => setLayout("center")}
          className={`${layout === "center" ? "bg-[#667eea] text-white" : "bg-[#e0e7ff] text-[#4338ca]"} border-2 border-transparent px-4 py-2 rounded-[20px] cursor-pointer transition-all mr-2`}
        >
          Center
        </button>
        <button
          onClick={() => setLayout("right")}
          className={`${layout === "right" ? "bg-[#667eea] text-white" : "bg-[#e0e7ff] text-[#4338ca]"} border-2 border-transparent px-4 py-2 rounded-[20px] cursor-pointer transition-all`}
        >
          Right
        </button>
      </div>

      <div
        className={`flex flex-wrap gap-5 ${layout === "center" ? "flex-col" : layout === "right" ? "flex-row-reverse" : "flex-row"} items-start`}
      >
        <div className={`relative cursor-grab ${layout === "center" ? "w-full mb-5" : "w-[40%]"}`} draggable>
          <div className="relative w-full aspect-square">
            <Image
              src="/square-image-placeholder.jpg"
              alt="Placeholder Image"
              fill
              className="rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] cursor-zoom-in object-cover"
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
        <div className={`flex-1 ${layout === "center" ? "w-full" : "min-w-[300px]"}`}>
          <div
            ref={paraRef}
            contentEditable
            suppressContentEditableWarning
            onInput={updateCharCount}
            className="min-h-[100px] p-2.5 outline-none leading-relaxed border border-[#ced4da] rounded-lg focus:border-[#667eea]"
          >
            <p>
              Drag the image to re-order! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesentium
              voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
              harum quidem rerum facilis est et expedita distinctio.
            </p>
          </div>
          <div
            className="text-right text-[0.9em] mt-2"
            style={{ color: charCount >= maxChars ? "#e0245e" : "#606770" }}
          >
            <span>{charCount}</span> / {maxChars}
          </div>
        </div>
      </div>

      {/* Modal for zoom */}
      {showModal && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80"
          onClick={() => setShowModal(false)}
        >
          <div className="relative max-w-[90%] max-h-[90%]">
            <Image
              src="/square-image-placeholder.jpg"
              alt="Zoomed Image"
              width={800}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
