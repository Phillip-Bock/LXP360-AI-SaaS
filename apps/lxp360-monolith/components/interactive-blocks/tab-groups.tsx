"use client"

import { useState } from "react"

interface Tab {
  id: string
  label: string
  content: string
}

export function TabGroups() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "tab1", label: "Vertical Tab 1", content: "Content for the first vertical tab." },
    { id: "tab2", label: "Vertical Tab 2", content: "Content for the second vertical tab." },
  ])
  const [activeTab, setActiveTab] = useState("tab1")

  const updateLabel = (id: string, newLabel: string) => {
    setTabs(tabs.map((tab) => (tab.id === id ? { ...tab, label: newLabel } : tab)))
  }

  const updateContent = (id: string, newContent: string) => {
    setTabs(tabs.map((tab) => (tab.id === id ? { ...tab, content: newContent } : tab)))
  }

  return (
    <div className="flex gap-5">
      <div className="flex flex-col border-r border-gray-200 pr-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-left px-4 py-3 border-b-0 border-l-3 transition-all ${
              activeTab === tab.id
                ? "border-l-[#0072F5] text-[#0072F5] font-bold bg-blue-50"
                : "border-l-transparent text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateLabel(tab.id, e.currentTarget.textContent || "")}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      <div className="flex-1">
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateContent(tab.id, e.currentTarget.textContent || "")}
              className="leading-relaxed text-gray-700"
            >
              {tab.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
