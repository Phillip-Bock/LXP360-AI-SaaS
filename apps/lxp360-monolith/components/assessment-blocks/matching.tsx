"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"

export function Matching() {
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const leftItems = [
    { id: "1", text: "Photosynthesis", correctMatch: "a" },
    { id: "2", text: "Respiration", correctMatch: "b" },
    { id: "3", text: "Transpiration", correctMatch: "c" },
  ]

  const rightItems = [
    { id: "a", text: "Water loss from leaves" },
    { id: "b", text: "Energy production from glucose" },
    { id: "c", text: "Light energy to chemical energy" },
  ]

  const handleMatch = (leftId: string, rightId: string) => {
    if (submitted) return
    setMatches({ ...matches, [leftId]: rightId })
  }

  const isCorrect = (leftId: string) => {
    const item = leftItems.find((i) => i.id === leftId)
    return item && matches[leftId] === item.correctMatch
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <Card className="p-8 border-2 border-[#001d3d] bg-white">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#001d3d] mb-2">Matching Exercise</h3>
          <p className="text-[#003066]">Match each term with its correct definition.</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            {leftItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border-2 ${
                  submitted
                    ? isCorrect(item.id)
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : matches[item.id]
                      ? "border-[#0072f5] bg-[#e3f2fd]"
                      : "border-[#e3f2fd]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#001d3d]">{item.text}</p>
                  {submitted && (
                    <div>
                      {isCorrect(item.id) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  )}
                </div>
                {matches[item.id] && (
                  <p className="text-sm text-[#003066] mt-2">
                    → {rightItems.find((r) => r.id === matches[item.id])?.text}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {rightItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  const leftId = Object.keys(matches).find((k) => matches[k] === item.id)
                  if (leftId) {
                    const newMatches = { ...matches }
                    delete newMatches[leftId]
                    setMatches(newMatches)
                  }
                }}
                disabled={submitted}
                className="w-full p-4 rounded-lg border-2 border-[#e3f2fd] hover:border-[#0072f5] hover:bg-[#e3f2fd] transition-all text-left disabled:opacity-50"
              >
                <p className="text-[#001d3d]">{item.text}</p>
              </button>
            ))}
          </div>
        </div>

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(matches).length < leftItems.length}
            className="bg-[#0072f5] hover:bg-[#0056b8] text-white rounded-[10px]"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="p-4 rounded-lg bg-[#e3f2fd] border-2 border-[#0072f5]">
            <p className="font-semibold text-[#001d3d] mb-2">Correct Matches:</p>
            <ul className="space-y-1">
              {leftItems.map((item) => (
                <li key={item.id} className="text-[#003066]">
                  {item.text} → {rightItems.find((r) => r.id === item.correctMatch)?.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  )
}
