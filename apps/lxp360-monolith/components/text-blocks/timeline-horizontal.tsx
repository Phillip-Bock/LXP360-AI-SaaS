"use client"

import { useState } from "react"

export default function TimelineHorizontal() {
  const [activeTab, setActiveTab] = useState("1980s")
  const tabs = [
    {
      id: "1980s",
      title: "1980s",
      heading: "The Age of Mainframes",
      content: "Early corporate e-learning begins with text-based training on large computer systems.",
    },
    {
      id: "1990s",
      title: "1990s",
      heading: "The Multimedia Revolution",
      content: "CD-ROMs and the web bring graphics, audio, and video to learning content.",
    },
    {
      id: "2000s",
      title: "2000s",
      heading: "The Rise of the LMS",
      content: "Learning Management Systems become mainstream, standardizing delivery and tracking.",
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div className="flex justify-center border-b-2 border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 border-b-[3px] transition-colors ${
              activeTab === tab.id
                ? "border-[#0072f5] text-[#0072f5] font-bold"
                : "border-transparent text-gray-600 hover:text-[#0072f5]"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.id} className={`text-center ${activeTab === tab.id ? "block" : "hidden"}`}>
          <h3 className="text-xl font-bold text-[#003066] mb-3">{tab.heading}</h3>
          <p className="text-gray-700 leading-relaxed">{tab.content}</p>
        </div>
      ))}
    </div>
  )
}
