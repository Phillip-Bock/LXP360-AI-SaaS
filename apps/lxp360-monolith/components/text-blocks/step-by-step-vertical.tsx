"use client"

import { useState } from "react"

export default function StepByStepVertical() {
  const [steps, setSteps] = useState([
    { title: "Step 1: Planning", description: "Define the project goals and create a detailed plan." },
    { title: "Step 2: Design", description: "Develop mockups and prototypes based on the plan." },
    { title: "Step 3: Development", description: "Build the final product with all features." },
  ])

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div className="relative pl-8 border-l-[3px] border-dashed border-[#70B3FF]">
        {steps.map((step, index) => (
          <div key={index} className="relative mb-8 last:mb-0">
            <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-white border-[3px] border-[#0072f5]" />
            <h3 className="text-lg font-bold text-[#003066] mb-2">{step.title}</h3>
            <p className="text-gray-700 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
