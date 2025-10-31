"use client"

import { useState } from "react"

interface DataPoint {
  label: string
  value: number
}

export function BarChart() {
  const [data] = useState<DataPoint[]>([
    { label: "Jan", value: 65 },
    { label: "Feb", value: 78 },
    { label: "Mar", value: 90 },
    { label: "Apr", value: 72 },
    { label: "May", value: 85 },
    { label: "Jun", value: 95 },
  ])

  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="p-8 bg-white rounded-lg border-2 border-[#001d3d]">
      <h3 className="text-2xl font-bold text-[#001d3d] mb-2">Monthly Performance</h3>
      <p className="text-[#003066] mb-6">Data visualization example</p>

      <div className="space-y-4">
        {data.map((point, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-12 text-right font-medium text-[#001d3d]">{point.label}</div>
            <div className="flex-1 bg-[#F5F5F5] rounded-lg h-12 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0072f5] to-[#0056b8] rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${(point.value / maxValue) * 100}%` }}
              >
                <span className="text-white font-bold">{point.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-[#003066]">
        <span>0</span>
        <span>{maxValue}</span>
      </div>
    </div>
  )
}
