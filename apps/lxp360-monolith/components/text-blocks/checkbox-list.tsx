"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckboxList() {
  const [items, setItems] = useState([
    { id: "1", text: "Complete initial setup.", checked: false },
    { id: "2", text: "Review the documentation.", checked: false },
    { id: "3", text: "Deploy the final version.", checked: false },
  ])

  const toggleCheck = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const updateText = (id: string, text: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, text } : item)))
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <Checkbox
              id={item.id}
              checked={item.checked}
              onCheckedChange={() => toggleCheck(item.id)}
              className="w-5 h-5"
            />
            <input
              type="text"
              value={item.text}
              onChange={(e) => updateText(item.id, e.target.value)}
              className="flex-1 border-none outline-none focus:ring-2 focus:ring-[#70B3FF] rounded px-2 py-1"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
