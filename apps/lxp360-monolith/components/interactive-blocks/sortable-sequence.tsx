"use client"

import type React from "react"

import { useState } from "react"
import { GripVertical, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SequenceItem {
  id: string
  text: string
  correctOrder: number
}

export function SortableSequence() {
  const [items, setItems] = useState<SequenceItem[]>(
    [
      { id: "1", text: "First step in the process", correctOrder: 1 },
      { id: "2", text: "Second step in the process", correctOrder: 2 },
      { id: "3", text: "Third step in the process", correctOrder: 3 },
      { id: "4", text: "Fourth step in the process", correctOrder: 4 },
      { id: "5", text: "Fifth step in the process", correctOrder: 5 },
    ].sort(() => Math.random() - 0.5),
  ) // Shuffle initially

  const [checked, setChecked] = useState(false)
  const [draggedItem, setDraggedItem] = useState<SequenceItem | null>(null)

  const handleDragStart = (item: SequenceItem) => {
    setDraggedItem(item)
  }

  const handleDrop = (dropIndex: number) => {
    if (!draggedItem) return

    const dragIndex = items.findIndex((item) => item.id === draggedItem.id)
    const newItems = [...items]
    newItems.splice(dragIndex, 1)
    newItems.splice(dropIndex, 0, draggedItem)

    setItems(newItems)
    setDraggedItem(null)
    setChecked(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const checkOrder = () => {
    setChecked(true)
  }

  const isCorrect = items.every((item, index) => item.correctOrder === index + 1)

  return (
    <div className="p-8 bg-white rounded-lg border-2 border-[#001d3d]">
      <h3 className="text-2xl font-bold text-[#001d3d] mb-2">Put in Correct Order</h3>
      <p className="text-[#003066] mb-6">Drag the items to arrange them in the correct sequence</p>

      <div className="space-y-3 mb-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item)}
            onDrop={() => handleDrop(index)}
            onDragOver={handleDragOver}
            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-move hover:shadow-lg transition-all ${
              checked
                ? item.correctOrder === index + 1
                  ? "bg-green-50 border-green-500"
                  : "bg-red-50 border-red-500"
                : "bg-[#F5F5F5] border-[#001d3d]"
            }`}
          >
            <GripVertical className="w-5 h-5 text-[#003066] flex-shrink-0" />
            <span className="flex-1 text-[#001d3d] font-medium">{item.text}</span>
            {checked && (
              <div className="flex-shrink-0">
                {item.correctOrder === index + 1 ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={checkOrder} className="bg-[#0072f5] hover:bg-[#0056b8] text-white rounded-[10px]">
          Check Order
        </Button>
        {checked && (
          <div className={`font-semibold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
            {isCorrect ? "✓ Correct! Well done!" : "✗ Not quite right. Try again!"}
          </div>
        )}
      </div>
    </div>
  )
}
