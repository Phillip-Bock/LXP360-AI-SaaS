"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <div className="p-8 bg-white rounded-lg border-2 border-[#001d3d]">
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        {/* Video placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#001d3d] to-[#003066]">
          <div className="text-center">
            <Play className="w-20 h-20 text-white mx-auto mb-4 opacity-50" />
            <p className="text-white text-lg">Video Player</p>
            <p className="text-white/70 text-sm">Add your video URL here</p>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-[#0072f5] transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-[#0072f5] transition-colors"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <span className="text-white text-sm">0:00 / 5:30</span>
            </div>
            <button className="text-white hover:text-[#0072f5] transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold text-[#001d3d] mb-2">Video Title</h3>
        <p className="text-[#003066] text-sm">Add a description for your video content here.</p>
      </div>
    </div>
  )
}
