"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GripVertical, Plus, X, ArrowUp, ArrowDown } from "lucide-react"

interface RankingProps {
  question?: string
  items?: string[]
  onRanking?: (rankedItems: string[]) => void
  isEditable?: boolean
}

export function Ranking({
  question = "Rank the following items in order of importance:",
  items = ["Item 1", "Item 2", "Item 3", "Item 4"],
  onRanking,
  isEditable = true,
}: RankingProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editQuestion, setEditQuestion] = useState(question)
  const [editItems, setEditItems] = useState<string[]>(items)
  const [newItem, setNewItem] = useState("")
  const [rankedItems, setRankedItems] = useState<string[]>([...items])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newRanked = [...rankedItems]
    const draggedItem = newRanked[draggedIndex]
    newRanked.splice(draggedIndex, 1)
    newRanked.splice(index, 0, draggedItem)
    setRankedItems(newRanked)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    onRanking?.(rankedItems)
  }

  const moveItem = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === rankedItems.length - 1)) {
      return
    }

    const newRanked = [...rankedItems]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    ;[newRanked[index], newRanked[targetIndex]] = [newRanked[targetIndex], newRanked[index]]
    setRankedItems(newRanked)
    onRanking?.(newRanked)
  }

  const addItem = () => {
    if (newItem.trim()) {
      setEditItems([...editItems, newItem.trim()])
      setRankedItems([...rankedItems, newItem.trim()])
      setNewItem("")
    }
  }

  const removeItem = (index: number) => {
    setEditItems(editItems.filter((_, i) => i !== index))
    setRankedItems(rankedItems.filter((_, i) => i !== index))
  }

  if (isEditing && isEditable) {
    return (
      <Card className="p-6 border-2 border-indigo-200 bg-indigo-50/50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="h-5 w-5 text-indigo-600" />
              <span className="font-semibold text-indigo-900">Edit Ranking Question</span>
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
            <Label>Items to Rank</Label>
            <div className="flex gap-2">
              <Input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add item..."
                onKeyPress={(e) => e.key === "Enter" && addItem()}
              />
              <Button onClick={addItem}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {editItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                  <Input
                    value={item}
                    onChange={(e) => {
                      const newItems = [...editItems]
                      newItems[index] = e.target.value
                      setEditItems(newItems)
                      const newRanked = [...rankedItems]
                      newRanked[index] = e.target.value
                      setRankedItems(newRanked)
                    }}
                  />
                  <Button size="sm" variant="ghost" onClick={() => removeItem(index)}>
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
    <Card className="p-6 border-l-4 border-l-indigo-600 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <GripVertical className="h-6 w-6 text-indigo-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">{editQuestion}</h3>

              <div className="space-y-2">
                {rankedItems.map((item, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-3 p-3 bg-white border-2 rounded-lg cursor-move hover:border-indigo-300 transition-colors ${
                      draggedIndex === index ? "opacity-50 border-indigo-400" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-5 w-5 text-gray-400" />
                      <div className="flex flex-col gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveItem(index, "up")}
                          disabled={index === 0}
                          className="h-4 w-4 p-0"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveItem(index, "down")}
                          disabled={index === rankedItems.length - 1}
                          className="h-4 w-4 p-0"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <span className="flex-1 text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm text-gray-600">Drag items to reorder, or use the arrow buttons</p>
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
