"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProcessHorizontal() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    { image: "/step-1.jpg", title: "Understand Your Physical Being" },
    { image: "/step-2.jpg", title: "Get to Blogging" },
    { image: "/step-3.jpg", title: "Know Your Industry" },
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div className="flex items-center gap-4">
        <Button
          onClick={prevSlide}
          variant="ghost"
          size="icon"
          className="text-[#70B3FF] hover:text-[#0072f5] text-2xl"
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
        <div className="flex-1 text-center">
          <img
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            className="w-full rounded-lg shadow-md mb-4"
          />
          <h4 className="text-lg font-semibold text-[#003066]">{slides[currentSlide].title}</h4>
        </div>
        <Button
          onClick={nextSlide}
          variant="ghost"
          size="icon"
          className="text-[#70B3FF] hover:text-[#0072f5] text-2xl"
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>
    </div>
  )
}
