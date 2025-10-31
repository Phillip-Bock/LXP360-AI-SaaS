"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"

export function MultipleSelect() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const options = [
    { id: "a", text: "Option A", isCorrect: true },
    { id: "b", text: "Option B", isCorrect: false },
    { id: "c", text: "Option C", isCorrect: true },
    { id: "d", text: "Option D", isCorrect: false },
  ]

  const handleToggle = (optionId: string) => {
    if (submitted) return
    setSelectedOptions((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]))
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setShowFeedback(true)
  }

  const isCorrect = () => {
    const correctIds = options.filter((o) => o.isCorrect).map((o) => o.id)
    return selectedOptions.length === correctIds.length && selectedOptions.every((id) => correctIds.includes(id))
  }

  return (
    <Card className="p-8 border-2 border-[#001d3d] bg-white">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#001d3d] mb-2">Multiple Select Question</h3>
          <p className="text-[#003066]">Select all correct answers that apply.</p>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <div
              key={option.id}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                submitted
                  ? selectedOptions.includes(option.id)
                    ? option.isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : option.isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-[#e3f2fd]"
                  : selectedOptions.includes(option.id)
                    ? "border-[#0072f5] bg-[#e3f2fd]"
                    : "border-[#e3f2fd] hover:border-[#0072f5]"
              }`}
              onClick={() => handleToggle(option.id)}
            >
              <Checkbox checked={selectedOptions.includes(option.id)} disabled={submitted} className="mt-0.5" />
              <div className="flex-1">
                <p className="text-[#001d3d]">{option.text}</p>
              </div>
              {submitted && (
                <div>
                  {option.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : selectedOptions.includes(option.id) ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedOptions.length === 0}
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
                ? "Great job! You selected all the correct answers."
                : "Review the correct answers highlighted in green."}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
