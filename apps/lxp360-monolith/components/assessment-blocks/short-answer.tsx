"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ShortAnswer() {
  const [answer, setAnswer] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const maxWords = 50
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <Card className="p-8 border-2 border-[#001d3d] bg-white">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#001d3d] mb-2">Short Answer Question</h3>
          <p className="text-[#003066]">Provide a brief answer to the question below (maximum {maxWords} words).</p>
        </div>

        <div className="p-4 bg-[#e3f2fd] rounded-lg border-2 border-[#0072f5]">
          <p className="text-[#001d3d] font-medium">
            Explain the main difference between photosynthesis and cellular respiration.
          </p>
        </div>

        <div className="space-y-2">
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={submitted}
            placeholder="Type your answer here..."
            className="min-h-[150px] border-[#001d3d] focus-visible:ring-[#0072f5]"
          />
          <div className="flex justify-between items-center">
            <Badge variant={wordCount > maxWords ? "destructive" : "secondary"} className="rounded-[10px]">
              {wordCount} / {maxWords} words
            </Badge>
            {wordCount > maxWords && <p className="text-sm text-red-600">Exceeds word limit</p>}
          </div>
        </div>

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={answer.trim().length === 0 || wordCount > maxWords}
            className="bg-[#0072f5] hover:bg-[#0056b8] text-white rounded-[10px]"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="p-4 rounded-lg bg-green-50 border-2 border-green-500">
            <p className="font-semibold text-green-700">✓ Answer Submitted</p>
            <p className="text-sm text-[#003066] mt-2">
              Your answer has been recorded and will be reviewed by your instructor.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
