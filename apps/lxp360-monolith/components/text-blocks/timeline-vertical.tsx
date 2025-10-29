"use client"

import { useState } from "react"

export default function TimelineVertical() {
  const [events, setEvents] = useState([
    { year: "2020: Project Inception", description: "Initial ideas were formed and the team was assembled." },
    { year: "2022: First Prototype", description: "A working model was developed and tested internally." },
    { year: "2024: Public Launch", description: "The product was released to the market." },
  ])

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div className="relative pl-8 border-l-[3px] border-[#C2DEFF]">
        {events.map((event, index) => (
          <div key={index} className="relative mb-8 last:mb-0">
            <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-white border-[3px] border-[#0072f5]" />
            <h3 className="text-lg font-bold text-[#003066] mb-2">{event.year}</h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
