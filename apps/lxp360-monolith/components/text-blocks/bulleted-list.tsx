"use client"

import { useState } from "react"
import { RichTextEditor } from "@/components/rich-text-editor"

type BulletStyle = "disc" | "square" | "star" | "arrow" | "diamond"

export default function BulletedList() {
  const [bulletStyle, setBulletStyle] = useState<BulletStyle>("disc")
  const [items, setItems] = useState([
    "A point about design.",
    "Another important consideration.",
    "A final summary point.",
  ])

  const getListStyleType = () => {
    switch (bulletStyle) {
      case "star":
        return "'★ '"
      case "arrow":
        return "'→ '"
      case "diamond":
        return "'♦ '"
      case "square":
        return "'■ '"
      default:
        return "disc"
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div className="mb-4">
        <label htmlFor="bullet-style" className="mr-2 text-sm font-medium">
          Style:
        </label>
        <select
          id="bullet-style"
          value={bulletStyle}
          onChange={(e) => setBulletStyle(e.target.value as BulletStyle)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
        >
          <option value="disc">Circle</option>
          <option value="square">Square</option>
          <option value="star">Star</option>
          <option value="arrow">Arrow</option>
          <option value="diamond">Diamond</option>
        </select>
      </div>
      <RichTextEditor
        value={items.map((item) => `<li>${item}</li>`).join("")}
        onChange={(content) => {
          const parser = new DOMParser()
          const doc = parser.parseFromString(content, "text/html")
          const listItems = Array.from(doc.querySelectorAll("li")).map((li) => li.textContent || "")
          setItems(listItems)
        }}
      />
      <ul className="pl-8 space-y-2" style={{ listStyleType: getListStyleType() }}>
        {items.map((item, index) => (
          <li key={index} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
