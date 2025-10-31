"use client"

import { useState } from "react"
import Image from "next/image"

interface Hotspot {
  id: string
  x: number
  y: number
  content: string
}

export function HotspotImage() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([
    { id: "1", x: 30, y: 25, content: "This is the first point of interest." },
    { id: "2", x: 70, y: 60, content: "Details about the second area." },
  ])
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)

  const updateContent = (id: string, newContent: string) => {
    setHotspots(hotspots.map((h) => (h.id === id ? { ...h, content: newContent } : h)))
  }

  return (
    <div className="relative max-w-[600px] mx-auto">
      <Image
        src="/interactive-image.jpg"
        alt="Interactive Image"
        width={600}
        height={400}
        className="w-full rounded-lg"
      />
      {hotspots.map((hotspot) => (
        <div
          key={hotspot.id}
          className="absolute w-6 h-6 rounded-full bg-white/90 cursor-pointer shadow-lg hover:scale-110 transition-transform"
          style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
          onMouseEnter={() => setActiveHotspot(hotspot.id)}
          onMouseLeave={() => setActiveHotspot(null)}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0072F5] text-xl font-bold">
            +
          </div>
          {activeHotspot === hotspot.id && (
            <div className="absolute bottom-[120%] left-1/2 -translate-x-1/2 bg-white p-4 rounded-lg shadow-xl w-[200px] z-10">
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateContent(hotspot.id, e.currentTarget.textContent || "")}
                className="text-sm text-gray-800"
              >
                {hotspot.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
