"use client"

import type React from "react"

import { useState } from "react"
import { GripVertical } from "lucide-react"

interface Item {
  id: string
  text: string
  category: string | null
}

interface Category {
  id: string
  name: string
}

export function DragDropCategorize() {
  const [categories] = useState<Category[]>([
    { id: "cat1", name: "Category A" },
    { id: "cat2", name: "Category B" },
    { id: "cat3", name: "Category C" },
  ])

  const [items, setItems] = useState<Item[]>([
    { id: "1", text: "Item 1", category: null },
    { id: "2", text: "Item 2", category: null },
    { id: "3", text: "Item 3", category: null },
    { id: "4", text: "Item 4", category: null },
    { id: "5", text: "Item 5", category: null },
    { id: "6", text: "Item 6", category: null },
  ])

  const [draggedItem, setDraggedItem] = useState<Item | null>(null)

  const handleDragStart = (item: Item) => {
    setDraggedItem(item)
  }

  const handleDrop = (categoryId: string) => {
    if (draggedItem) {
      setItems(items.map((item) => (item.id === draggedItem.id ? { ...item, category: categoryId } : item)))
      setDraggedItem(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const uncategorizedItems = items.filter((item) => !item.category)

  return (
    <div className="p-8 bg-white rounded-lg border-2 border-[#001d3d]">
      <h3 className="text-2xl font-bold text-[#001d3d] mb-2">Drag to Categorize</h3>
      <p className="text-[#003066] mb-6">Drag each item into the correct category</p>

      {/* Uncategorized Items */}
      <div className="mb-8 p-4 bg-[#F5F5F5] rounded-lg border-2 border-dashed border-[#001d3d]">
        <h4 className="font-semibold text-[#001d3d] mb-3">Items to Categorize</h4>
        <div className="flex flex-wrap gap-3">
          {uncategorizedItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-[#0072f5] cursor-move hover:shadow-lg transition-shadow"
            >
              <GripVertical className="w-4 h-4 text-[#003066]" />
              <span className="text-[#001d3d] font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onDrop={() => handleDrop(category.id)}
            onDragOver={handleDragOver}
            className="p-4 bg-[#e3f2fd] rounded-lg border-2 border-[#0072f5] min-h-[200px]"
          >
            <h4 className="font-bold text-[#001d3d] mb-3 text-center">{category.name}</h4>
            <div className="space-y-2">
              {items
                .filter((item) => item.category === category.id)
                .map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item)}
                    className="px-3 py-2 bg-white rounded-lg border border-[#001d3d] cursor-move hover:shadow-md transition-shadow"
                  >
                    <span className="text-[#001d3d]">{item.text}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
