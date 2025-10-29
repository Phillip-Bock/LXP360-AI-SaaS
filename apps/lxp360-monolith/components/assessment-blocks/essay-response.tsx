"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Save, X } from "lucide-react"

interface EssayResponseProps {
  question?: string
  minWords?: number
  maxWords?: number
  rubric?: string[]
  onSave?: (response: string) => void
  isEditable?: boolean
}

export function EssayResponse({
  question = "Write your essay response here...",
  minWords = 100,
  maxWords = 500,
  rubric = [],
  onSave,
  isEditable = true,
}: EssayResponseProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editQuestion, setEditQuestion] = useState(question)
  const [editMinWords, setEditMinWords] = useState(minWords)
  const [editMaxWords, setEditMaxWords] = useState(maxWords)
  const [editRubric, setEditRubric] = useState<string[]>(rubric)
  const [newRubricItem, setNewRubricItem] = useState("")
  const [response, setResponse] = useState("")

  const wordCount = response.trim().split(/\s+/).filter(Boolean).length
  const isWithinRange = wordCount >= minWords && wordCount <= maxWords

  const handleSave = () => {
    setIsEditing(false)
    onSave?.(response)
  }

  const addRubricItem = () => {
    if (newRubricItem.trim()) {
      setEditRubric([...editRubric, newRubricItem.trim()])
      setNewRubricItem("")
    }
  }

  const removeRubricItem = (index: number) => {
    setEditRubric(editRubric.filter((_, i) => i !== index))
  }

  if (isEditing && isEditable) {
    return (
      <Card className="p-6 border-2 border-blue-200 bg-blue-50/50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Edit Essay Question</span>
            </div>
            <Button size="sm" onClick={() => setIsEditing(false)}>
              Done
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Question/Prompt</Label>
            <Textarea
              value={editQuestion}
              onChange={(e) => setEditQuestion(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Minimum Words</Label>
              <Input type="number" value={editMinWords} onChange={(e) => setEditMinWords(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Maximum Words</Label>
              <Input type="number" value={editMaxWords} onChange={(e) => setEditMaxWords(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Rubric Criteria</Label>
            <div className="flex gap-2">
              <Input
                value={newRubricItem}
                onChange={(e) => setNewRubricItem(e.target.value)}
                placeholder="Add rubric criterion..."
                onKeyPress={(e) => e.key === "Enter" && addRubricItem()}
              />
              <Button onClick={addRubricItem}>Add</Button>
            </div>
            <div className="space-y-2">
              {editRubric.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm">{item}</span>
                  <Button size="sm" variant="ghost" onClick={() => removeRubricItem(index)}>
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
    <Card className="p-6 border-l-4 border-l-blue-600 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <FileText className="h-6 w-6 text-blue-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{editQuestion}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>Min: {editMinWords} words</span>
                <span>Max: {editMaxWords} words</span>
              </div>

              {editRubric.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Rubric:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {editRubric.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your essay response here..."
                className="min-h-[200px] mb-2"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${isWithinRange ? "text-green-600" : "text-orange-600"}`}>
                    {wordCount} words
                  </span>
                  {!isWithinRange && (
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      {wordCount < editMinWords ? "Too short" : "Too long"}
                    </Badge>
                  )}
                </div>
                <Button onClick={handleSave} disabled={!isWithinRange}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Response
                </Button>
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
