"use client"

import { useState, useEffect } from "react"

interface ColumnData {
  id: number
  content: string
  charCount: number
}

export function MultiColumnLayout() {
  const [numColumns, setNumColumns] = useState(2)
  const [columns, setColumns] = useState<ColumnData[]>([
    {
      id: 1,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
      charCount: 0,
    },
    {
      id: 2,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
      charCount: 0,
    },
  ])
  const maxChars = 500

  useEffect(() => {
    const newColumns: ColumnData[] = []
    for (let i = 1; i <= numColumns; i++) {
      newColumns.push({
        id: i,
        content:
          columns[i - 1]?.content ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
        charCount: columns[i - 1]?.charCount || 0,
      })
    }
    setColumns(newColumns)
  }, [numColumns])

  const updateCharCount = (index: number, element: HTMLDivElement) => {
    const text = element.innerText || ""
    if (text.length > maxChars) {
      element.innerText = text.substring(0, maxChars)
    }
    const newColumns = [...columns]
    newColumns[index].charCount = element.innerText.length
    setColumns(newColumns)
  }

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-10 w-full max-w-[1200px] mx-auto my-5">
      <div className="mb-5 text-center">
        <label className="mr-2.5 font-medium">Number of columns:</label>
        <button
          onClick={() => setNumColumns(2)}
          className={`${numColumns === 2 ? "bg-[#667eea] text-white" : "bg-[#e0e7ff] text-[#4338ca]"} border-2 border-transparent px-4 py-2 rounded-[20px] cursor-pointer transition-all mr-2`}
        >
          2
        </button>
        <button
          onClick={() => setNumColumns(3)}
          className={`${numColumns === 3 ? "bg-[#667eea] text-white" : "bg-[#e0e7ff] text-[#4338ca]"} border-2 border-transparent px-4 py-2 rounded-[20px] cursor-pointer transition-all mr-2`}
        >
          3
        </button>
        <button
          onClick={() => setNumColumns(4)}
          className={`${numColumns === 4 ? "bg-[#667eea] text-white" : "bg-[#e0e7ff] text-[#4338ca]"} border-2 border-transparent px-4 py-2 rounded-[20px] cursor-pointer transition-all`}
        >
          4
        </button>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}>
        {columns.map((column, index) => (
          <div key={column.id} className="border border-[#e0e0e0] rounded-lg p-4">
            {/* RTE Toolbar */}
            <div className="flex flex-wrap bg-[#f8f9fa] border border-[#dee2e6] rounded-lg p-1.5 mb-2.5">
              <div className="flex">
                <button title="Bold" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
                  <b>B</b>
                </button>
                <button title="Italic" className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]">
                  <i>I</i>
                </button>
              </div>
              <div className="flex ml-2">
                <button
                  title="Bulleted List"
                  className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]"
                >
                  •
                </button>
                <button
                  title="Numbered List"
                  className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]"
                >
                  1.
                </button>
              </div>
              <div className="flex ml-2">
                <button
                  title="Re-write with AI"
                  className="bg-none border-none p-2 cursor-pointer rounded hover:bg-[#e9ecef]"
                >
                  ✨
                </button>
              </div>
            </div>

            <div
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => updateCharCount(index, e.currentTarget)}
              className="min-h-[100px] p-2.5 outline-none leading-relaxed focus:shadow-[0_0_0_2px_rgba(102,126,234,0.2)]"
            >
              <p>{column.content}</p>
            </div>
            <div
              className="text-right text-[0.9em] mt-2"
              style={{ color: column.charCount >= maxChars ? "#e0245e" : "#606770" }}
            >
              <span>{column.charCount}</span> / {maxChars}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
