"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart3, Plus, X } from "lucide-react"

interface LikertScaleProps {
  question?: string
  statements?: string[]
  scale?: string[]
  onResponse?: (responses: Record<string, number>) => void
  isEditable?: boolean
}

export function LikertScale({
  question = "Rate your agreement with the following statements:",
  statements = ["Statement 1", "Statement 2", "Statement 3"],
  scale = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
  onResponse,
  isEditable = true,
}: LikertScaleProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editQuestion, setEditQuestion] = useState(question)
  const [editStatements, setEditStatements] = useState<string[]>(statements)
  const [editScale, setEditScale] = useState<string[]>(scale)
  const [newStatement, setNewStatement] = useState("")
  const [responses, setResponses] = useState<Record<string, number>>({})

  const handleResponse = (statementIndex: number, scaleValue: number) => {
    const newResponses = { ...responses, [statementIndex]: scaleValue }
    setResponses(newResponses)
    onResponse?.(newResponses)
  }

  const addStatement = () => {
    if (newStatement.trim()) {
      setEditStatements([...editStatements, newStatement.trim()])
      setNewStatement("")
    }
  }

  const removeStatement = (index: number) => {
    setEditStatements(editStatements.filter((_, i) => i !== index))
  }

  if (isEditing && isEditable) {
    return (
      <Card className="p-6 border-2 border-purple-200 bg-purple-50/50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-purple-900">Edit Likert Scale</span>
            </div>
            <Button size="sm" onClick={() => setIsEditing(false)}>
              Done
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Question</Label>
            <Input value={editQuestion} onChange={(e) => setEditQuestion(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Statements</Label>
            <div className="flex gap-2">
              <Input
                value={newStatement}
                onChange={(e) => setNewStatement(e.target.value)}
                placeholder="Add statement..."
                onKeyPress={(e) => e.key === "Enter" && addStatement()}
              />
              <Button onClick={addStatement}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {editStatements.map((statement, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                  <Input
                    value={statement}
                    onChange={(e) => {
                      const newStatements = [...editStatements]
                      newStatements[index] = e.target.value
                      setEditStatements(newStatements)
                    }}
                  />
                  <Button size="sm" variant="ghost" onClick={() => removeStatement(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 border-l-4 border-l-purple-600 hover:shadow-md transition-shadow">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <BarChart3 className="h-6 w-6 text-purple-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-6">{editQuestion}</h3>

              <div className="space-y-4">
                {/* Scale header */}
                <div className="grid gap-2" style={{ gridTemplateColumns: `2fr repeat(${editScale.length}, 1fr)` }}>
                  <div></div>
                  {editScale.map((label, index) => (
                    <div key={index} className="text-center text-xs font-medium text-gray-600">
                      {label}
                    </div>
                  ))}
                </div>

                {/* Statements with radio buttons */}
                {editStatements.map((statement, statementIndex) => (
                  <div
                    key={statementIndex}
                    className="grid gap-2 items-center p-3 rounded hover:bg-gray-50"
                    style={{ gridTemplateColumns: `2fr repeat(${editScale.length}, 1fr)` }}
                  >
                    <div className="text-sm text-gray-700">{statement}</div>
                    {editScale.map((_, scaleIndex) => (
                      <div key={scaleIndex} className="flex justify-center">
                        <input
                          type="radio"
                          name={`statement-${statementIndex}`}
                          checked={responses[statementIndex] === scaleIndex}
                          onChange={() => handleResponse(statementIndex, scaleIndex)}
                          className="h-4 w-4 text-purple-600 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-600">
                {Object.keys(responses).length} of {editStatements.length} answered
              </div>
            </div>
          </div>
          {isEditable && (
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
