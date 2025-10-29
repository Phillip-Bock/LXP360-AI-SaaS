"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export function TrueFalse() {
  const [statement, setStatement] = useState("The Earth is flat.")
  const [correctAnswer] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleReset = () => {
    setSelectedAnswer(null)
    setSubmitted(false)
  }

  const isCorrect = selectedAnswer === correctAnswer

  return (
    <div className="p-8 bg-white rounded-lg border-2 border-[#001d3d]">
      <h3 className="text-xl font-bold text-[#001d3d] mb-2">True or False?</h3>
      <p className="text-lg text-[#003066] mb-6">{statement}</p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => !submitted && setSelectedAnswer(true)}
          disabled={submitted}
          className={`flex-1 p-6 rounded-lg border-2 font-bold text-lg transition-all ${
            submitted
              ? correctAnswer === true
                ? "bg-green-50 border-green-500 text-green-700"
                : selectedAnswer === true
                  ? "bg-red-50 border-red-500 text-red-700"
                  : "bg-[#F5F5F5] border-[#001d3d] text-[#003066] opacity-50"
              : selectedAnswer === true
                ? "bg-[#e3f2fd] border-[#0072f5] text-[#0072f5]"
                : "bg-[#F5F5F5] border-[#001d3d] text-[#003066] hover:border-[#0072f5]"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span>TRUE</span>
            {submitted && correctAnswer === true && <Check className="w-6 h-6 text-green-600" />}
            {submitted && selectedAnswer === true && correctAnswer === false && <X className="w-6 h-6 text-red-600" />}
          </div>
        </button>

        <button
          onClick={() => !submitted && setSelectedAnswer(false)}
          disabled={submitted}
          className={`flex-1 p-6 rounded-lg border-2 font-bold text-lg transition-all ${
            submitted
              ? correctAnswer === false
                ? "bg-green-50 border-green-500 text-green-700"
                : selectedAnswer === false
                  ? "bg-red-50 border-red-500 text-red-700"
                  : "bg-[#F5F5F5] border-[#001d3d] text-[#003066] opacity-50"
              : selectedAnswer === false
                ? "bg-[#e3f2fd] border-[#0072f5] text-[#0072f5]"
                : "bg-[#F5F5F5] border-[#001d3d] text-[#003066] hover:border-[#0072f5]"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span>FALSE</span>
            {submitted && correctAnswer === false && <Check className="w-6 h-6 text-green-600" />}
            {submitted && selectedAnswer === false && correctAnswer === true && <X className="w-6 h-6 text-red-600" />}
          </div>
        </button>
      </div>

      {!submitted ? (
        <Button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="bg-[#0072f5] hover:bg-[#0056b8] text-white rounded-[10px]"
        >
          Submit Answer
        </Button>
      ) : (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg ${
              isCorrect ? "bg-green-50 border-2 border-green-500" : "bg-red-50 border-2 border-red-500"
            }`}
          >
            <p className="text-[#001d3d] font-medium">
              {isCorrect
                ? "✓ Correct! Well done!"
                : "✗ Incorrect. The correct answer is " + (correctAnswer ? "TRUE" : "FALSE") + "."}
            </p>
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
