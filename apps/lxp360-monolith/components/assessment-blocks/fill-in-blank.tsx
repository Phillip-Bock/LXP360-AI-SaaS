"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"

export function FillInBlank() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const blanks = [
    { id: "1", correctAnswer: "photosynthesis", position: 0 },
    { id: "2", correctAnswer: "chlorophyll", position: 1 },
  ]

  const textParts = [
    "Plants use ",
    " to convert sunlight into energy. This process occurs in ",
    " which gives plants their green color.",
  ]

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const isCorrect = (blankId: string) => {
    const blank = blanks.find((b) => b.id === blankId)
    return blank && answers[blankId]?.toLowerCase().trim() === blank.correctAnswer.toLowerCase()
  }

  return (
    <Card className="p-8 border-2 border-[#001d3d] bg-white">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#001d3d] mb-2">Fill in the Blanks</h3>
          <p className="text-[#003066]">Complete the sentence by filling in the missing words.</p>
        </div>

        <div className="text-lg leading-relaxed">
          {textParts.map((part, index) => (
            <span key={index}>
              {part}
              {index < blanks.length && (
                <span className="inline-block mx-2">
                  <Input
                    value={answers[blanks[index].id] || ""}
                    onChange={(e) => setAnswers({ ...answers, [blanks[index].id]: e.target.value })}
                    disabled={submitted}
                    className={`w-48 inline-block ${
                      submitted
                        ? isCorrect(blanks[index].id)
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-[#001d3d]"
                    }`}
                    placeholder="Type here..."
                  />
                  {submitted && (
                    <span className="ml-2 inline-block">
                      {isCorrect(blanks[index].id) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 inline" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 inline" />
                      )}
                    </span>
                  )}
                </span>
              )}
            </span>
          ))}
        </div>

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < blanks.length}
            className="bg-[#0072f5] hover:bg-[#0056b8] text-white rounded-[10px]"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="p-4 rounded-lg bg-[#e3f2fd] border-2 border-[#0072f5]">
            <p className="font-semibold text-[#001d3d]">Correct Answers:</p>
            <ul className="mt-2 space-y-1">
              {blanks.map((blank) => (
                <li key={blank.id} className="text-[#003066]">
                  Blank {blank.id}: <span className="font-semibold">{blank.correctAnswer}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  )
}
