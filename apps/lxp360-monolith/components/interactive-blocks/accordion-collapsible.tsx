"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface AccordionItem {
  id: string
  title: string
  content: string
}

export function AccordionCollapsible() {
  const [items, setItems] = useState<AccordionItem[]>([
    {
      id: "1",
      title: "Collapsible Section 1",
      content: "This is the content for the first collapsible section. It can contain any text or media.",
    },
    {
      id: "2",
      title: "Collapsible Section 2",
      content: "Here is the content for the second section, revealed upon clicking the header.",
    },
  ])
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const updateTitle = (id: string, newTitle: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, title: newTitle } : item)))
  }

  const updateContent = (id: string, newContent: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, content: newContent } : item)))
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="border-b border-gray-200">
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full flex justify-between items-center py-5 text-left hover:bg-gray-50 transition-colors"
          >
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateTitle(item.id, e.currentTarget.textContent || "")}
              className="text-lg font-medium flex-1"
            >
              {item.title}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${openItems.has(item.id) ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${openItems.has(item.id) ? "max-h-96" : "max-h-0"}`}
          >
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateContent(item.id, e.currentTarget.textContent || "")}
              className="pb-5 px-2 leading-relaxed text-gray-700"
            >
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
