"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react"

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(75)

  return (
    <div className="p-8 bg-gradient-to-br from-[#e3f2fd] to-white rounded-lg border-2 border-[#001d3d]">
      <div className="flex items-center gap-6">
        {/* Album art placeholder */}
        <div className="w-32 h-32 bg-gradient-to-br from-[#0072f5] to-[#003066] rounded-lg flex items-center justify-center flex-shrink-0">
          <Volume2 className="w-12 h-12 text-white" />
        </div>

        {/* Player controls */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#001d3d] mb-1">Audio Title</h3>
          <p className="text-[#003066] text-sm mb-4">Artist or Speaker Name</p>

          {/* Progress bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-2 bg-[#001d3d]/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[#003066] mt-1">
              <span>0:00</span>
              <span>3:45</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-[#003066] hover:text-[#0072f5] transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 bg-[#0072f5] hover:bg-[#0056b8] rounded-full flex items-center justify-center text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <button className="text-[#003066] hover:text-[#0072f5] transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-[#003066] hover:text-[#0072f5] transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-24 h-1 bg-[#001d3d]/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
