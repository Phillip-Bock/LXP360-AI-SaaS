"use client"

import { useState, useEffect, useRef } from "react"

interface StatItem {
  target: number
  label: string
}

export function StatisticsDisplay() {
  const [stats, setStats] = useState<StatItem[]>([
    { target: 87, label: "Engagement" },
    { target: 95, label: "Completion" },
    { target: 150, label: "Resources" },
  ])
  const [currentValues, setCurrentValues] = useState([0, 0, 0])
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          stats.forEach((stat, index) => {
            let count = 0
            const increment = stat.target / 100
            const timer = setInterval(() => {
              count += increment
              if (count >= stat.target) {
                setCurrentValues((prev) => {
                  const newValues = [...prev]
                  newValues[index] = stat.target
                  return newValues
                })
                clearInterval(timer)
              } else {
                setCurrentValues((prev) => {
                  const newValues = [...prev]
                  newValues[index] = Math.ceil(count)
                  return newValues
                })
              }
            }, 20)
          })
        }
      },
      { threshold: 0.5 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated, stats])

  const updateLabel = (index: number, newLabel: string) => {
    setStats((prev) => {
      const newStats = [...prev]
      newStats[index] = { ...newStats[index], label: newLabel }
      return newStats
    })
  }

  return (
    <div ref={containerRef} className="flex justify-around text-center py-8">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <div className="text-5xl font-bold text-[#0072F5] mb-2">{currentValues[index]}</div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateLabel(index, e.currentTarget.textContent || "")}
            className="text-[#4a5568] outline-none focus:ring-2 focus:ring-[#70B3FF] rounded px-2"
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
