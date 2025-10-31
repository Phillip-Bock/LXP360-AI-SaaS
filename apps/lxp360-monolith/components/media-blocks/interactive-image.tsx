"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, MapPin } from "lucide-react"
import Image from "next/image"

interface Hotspot {
  id: string
  x: number
  y: number
  title: string
  content: string
}

export function InteractiveImage() {
  const [imageUrl, setImageUrl] = useState("/interactive-diagram.jpg")
  const [hotspots, setHotspots] = useState<Hotspot[]>([])
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const addHotspot = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditing) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const newHotspot: Hotspot = {
      id: Date.now().toString(),
      x,
      y,
      title: "New Hotspot",
      content: "Click to edit this hotspot content",
    }
    setHotspots([...hotspots, newHotspot])
  }

  const removeHotspot = (id: string) => {
    setHotspots(hotspots.filter((h) => h.id !== id))
    if (activeHotspot === id) setActiveHotspot(null)
  }

  const updateHotspot = (id: string, field: keyof Hotspot, value: string) => {
    setHotspots(hotspots.map((h) => (h.id === id ? { ...h, [field]: value } : h)))
  }

  return (
    <Card className="p-6 border-l-4 border-l-[#0072f5]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#001d3d]">Interactive Image</h3>
        <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Done Editing" : "Edit Hotspots"}
        </Button>
      </div>

      {isEditing && (
        <div className="mb-4">
          <Label>Image URL</Label>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Enter image URL" />
          <p className="text-xs text-muted-foreground mt-1">Click on the image to add hotspots</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Interactive Image */}
        <div
          className="relative aspect-video bg-muted rounded-lg overflow-hidden cursor-crosshair"
          onClick={addHotspot}
        >
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt="Interactive image with hotspots"
            fill
            className="object-cover"
          />

          {/* Hotspot Markers */}
          {hotspots.map((hotspot) => (
            <div key={hotspot.id} className="absolute" style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}>
              <button
                className={`relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  activeHotspot === hotspot.id
                    ? "bg-[#0072f5] scale-125"
                    : "bg-[#0072f5]/80 hover:bg-[#0072f5] hover:scale-110"
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)
                }}
              >
                <MapPin className="w-4 h-4 text-white" />
                {isEditing && (
                  <button
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeHotspot(hotspot.id)
                    }}
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                )}
              </button>

              {/* Hotspot Popup */}
              {activeHotspot === hotspot.id && !isEditing && (
                <div className="absolute left-full ml-2 top-0 w-64 bg-white border border-border rounded-lg shadow-lg p-4 z-10">
                  <h4 className="font-semibold text-[#001d3d] mb-2">{hotspot.title}</h4>
                  <p className="text-sm text-muted-foreground">{hotspot.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Edit Hotspots */}
        {isEditing && hotspots.length > 0 && (
          <div className="space-y-3 border-t pt-4">
            <h4 className="font-medium">Hotspot Details</h4>
            {hotspots.map((hotspot, idx) => (
              <Card key={hotspot.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h5 className="font-medium">Hotspot {idx + 1}</h5>
                  <Button variant="ghost" size="sm" onClick={() => removeHotspot(hotspot.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={hotspot.title}
                      onChange={(e) => updateHotspot(hotspot.id, "title", e.target.value)}
                      placeholder="Hotspot title"
                    />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      value={hotspot.content}
                      onChange={(e) => updateHotspot(hotspot.id, "content", e.target.value)}
                      placeholder="Hotspot description"
                      rows={3}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
