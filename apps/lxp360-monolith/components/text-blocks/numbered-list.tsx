"use client"

import { useState } from "react"
import { RichTextEditor } from "@/components/rich-text-editor"

type NumberedListStyle = "1" | "A" | "a" | "I"

export default function NumberedList() {
  const [listStyle, setListStyle] = useState<NumberedListStyle>("1")
  const [items, setItems] = useState([
    "First item in the list.",
    "Second item for demonstration.",
    "Third and final item.",
  ])

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div className="mb-4">
        <label htmlFor="numbered-style" className="mr-2 text-sm font-medium">
          Style:
        </label>
        <select
          id="numbered-style"
          value={listStyle}
          onChange={(e) => setListStyle(e.target.value as NumberedListStyle)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
        >
          <option value="1">1, 2, 3</option>
          <option value="A">A, B, C</option>
          <option value="a">a, b, c</option>
          <option value="I">I, II, III</option>
        </select>
      </div>
      <RichTextEditor
        value={items.map((item, i) => `<li>${item}</li>`).join("")}
        onChange={(content) => {
          // Parse list items from content
          const parser = new DOMParser()
          const doc = parser.parseFromString(content, "text/html")
          const listItems = Array.from(doc.querySelectorAll("li")).map((li) => li.textContent || "")
          setItems(listItems)
        }}
      />
      <ol
        type={listStyle}
        className="pl-8 space-y-2"
        style={{
          listStyleType:
            listStyle === "1"
              ? "decimal"
              : listStyle === "A"
                ? "upper-alpha"
                : listStyle === "a"
                  ? "lower-alpha"
                  : "upper-roman",
        }}
      >
        {items.map((item, index) => (
          <li key={index} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ol>
    </div>
  )
}
