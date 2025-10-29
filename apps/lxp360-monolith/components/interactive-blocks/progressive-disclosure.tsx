"use client"

import { useState } from "react"

interface Step {
  id: string
  content: string
}

export function ProgressiveDisclosure() {
  const [steps, setSteps] = useState<Step[]>([
    { id: "1", content: "This is the first piece of information. When you're ready, click continue to see more." },
    { id: "2", content: "This is the second piece of information, revealed after the first step." },
    { id: "3", content: "This is the final piece of information in the sequence." },
  ])
  const [currentStep, setCurrentStep] = useState(0)

  const updateContent = (id: string, newContent: string) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, content: newContent } : step)))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`transition-all duration-500 ${index <= currentStep ? "opacity-100 animate-fadeIn" : "hidden"}`}
        >
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateContent(step.id, e.currentTarget.textContent || "")}
            className="leading-relaxed text-gray-700 mb-3"
          >
            {step.content}
          </p>
          {index === currentStep && index < steps.length - 1 && (
            <button
              onClick={nextStep}
              className="px-5 py-2 bg-[#0072F5] text-white rounded-lg hover:bg-[#0056B8] transition-colors"
            >
              Continue
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
