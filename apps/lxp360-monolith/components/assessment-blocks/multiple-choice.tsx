"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

interface Option {
  id: string
  text: string
  isCorrect: boolean
}

export function MultipleChoice() {
  const [question, setQuestion] = useState("What is the capital of France?")
  const [options] = useState<Option[]>([
    { id: "a", text: "London", isCorrect: false },
    { id: "b", text: "Paris", isCorrect: true },
    { id: "c", text: "Berlin", isCorrect: false },
    { id: "d", text: "Madrid", isCorrect: false },
  ])

  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState("")

  const handleSubmit = () => {
    if (!selectedOption) return

    const selected = options.find((opt) => opt.id === selectedOption)
    setSubmitted(true)

    if (selected?.isCorrect) {
      setFeedback("Correct! Paris is the capital of France.")
    } else {
      setFeedback("Incorrect. The correct answer is Paris.")
    }
  }

  const handleReset = () => {
    setSelectedOption(null)
    setSubmitted(false)
    setFeedback("")
  }

  return (
    <div className="p-8 bg-white rounded-lg border-2 border-[#001d3d]">
      <h3 className="text-xl font-bold text-[#001d3d] mb-6">{question}</h3>

      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => !submitted && setSelectedOption(option.id)}
            disabled={submitted}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              submitted
                ? option.isCorrect
                  ? "bg-green-50 border-green-500"
                  : selectedOption === option.id
                    ? "bg-red-50 border-red-500"
                    : "bg-[#F5F5F5] border-[#001d3d] opacity-50"
                : selectedOption === option.id
                  ? "bg-[#e3f2fd] border-[#0072f5]"
                  : "bg-[#F5F5F5] border-[#001d3d] hover:border-[#0072f5]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[#001d3d] font-medium">{option.text}</span>
              {submitted && (
                <div>
                  {option.isCorrect ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    selectedOption === option.id && <X className="w-5 h-5 text-red-600" />
                  )}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {!submitted ? (
        <Button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="bg-[#0072f5] hover:bg-[#0056b8] text-white rounded-[10px]"
        >
          Submit Answer
        </Button>
      ) : (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg ${
              options.find((opt) => opt.id === selectedOption)?.isCorrect
                ? "bg-green-50 border-2 border-green-500"
                : "bg-red-50 border-2 border-red-500"
            }`}
          >
            <p className="text-[#001d3d] font-medium">{feedback}</p>
          </div>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-[#001d3d] text-[#003066] rounded-[10px] bg-transparent"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}
