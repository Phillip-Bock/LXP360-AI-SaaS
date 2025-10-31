"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CheckCircle2, XCircle } from "lucide-react"

export function HotspotQuestion() {
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const hotspots = [
    { id: "1", x: 30, y: 40, isCorrect: false },
    { id: "2", x: 60, y: 50, isCorrect: true },
    { id: "3", x: 45, y: 70, isCorrect: false },
  ]

  const handleSpotClick = (spotId: string) => {
    if (submitted) return
    setSelectedSpot(spotId)
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const isCorrect = () => {
    const spot = hotspots.find((h) => h.id === selectedSpot)
    return spot?.isCorrect || false
  }

  return (
    <Card className="p-8 border-2 border-[#001d3d] bg-white">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#001d3d] mb-2">Hotspot Question</h3>
          <p className="text-[#003066]">Click on the correct location in the image.</p>
        </div>

        <div className="relative w-full aspect-video bg-[#e3f2fd] rounded-lg overflow-hidden border-2 border-[#001d3d]">
          <Image src="/placeholder.svg?height=400&width=600" alt="Question image" fill className="object-cover" />
          {hotspots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => handleSpotClick(spot.id)}
              disabled={submitted}
              className={`absolute w-12 h-12 rounded-full border-4 transition-all ${
                selectedSpot === spot.id
                  ? submitted
                    ? spot.isCorrect
                      ? "bg-green-500 border-green-700"
                      : "bg-red-500 border-red-700"
                    : "bg-[#0072f5] border-[#0056b8]"
                  : "bg-white/50 border-white hover:bg-white/80"
              }`}
              style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: "translate(-50%, -50%)" }}
            >
              {submitted && selectedSpot === spot.id && (
                <div className="flex items-center justify-center">
                  {spot.isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : (
                    <XCircle className="w-6 h-6 text-white" />
                  )}
                </div>
              )}
            </button>
          ))}
        </div>

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedSpot}
            className="bg-[#0072f5] hover:bg-[#0056b8] text-white rounded-[10px]"
          >
            Submit Answer
          </Button>
        ) : (
          <div
            className={`p-4 rounded-lg ${
              isCorrect() ? "bg-green-50 border-2 border-green-500" : "bg-red-50 border-2 border-red-500"
            }`}
          >
            <p className={`font-semibold ${isCorrect() ? "text-green-700" : "text-red-700"}`}>
              {isCorrect() ? "✓ Correct!" : "✗ Incorrect"}
            </p>
            <p className="text-sm text-[#003066] mt-2">
              {isCorrect()
                ? "Great job! You identified the correct location."
                : "The correct location is highlighted in green."}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
