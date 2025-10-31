"use client"

import { useState } from "react"

interface FlipCard {
  id: string
  front: string
  back: string
}

export function FlipCards() {
  const [cards, setCards] = useState<FlipCard[]>([
    { id: "1", front: "Front of Card", back: "This is the back. Revealed on hover." },
    { id: "2", front: "Key Term", back: "Definition of the key term goes here." },
  ])
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

  const toggleFlip = (id: string) => {
    const newFlipped = new Set(flippedCards)
    if (newFlipped.has(id)) {
      newFlipped.delete(id)
    } else {
      newFlipped.add(id)
    }
    setFlippedCards(newFlipped)
  }

  const updateFront = (id: string, newFront: string) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, front: newFront } : card)))
  }

  const updateBack = (id: string, newBack: string) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, back: newBack } : card)))
  }

  return (
    <div className="flex gap-5 flex-wrap">
      {cards.map((card) => (
        <div
          key={card.id}
          className="w-[200px] h-[250px] cursor-pointer perspective-1000"
          onClick={() => toggleFlip(card.id)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-600 transform-style-3d ${
              flippedCards.has(card.id) ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <div className="absolute w-full h-full backface-hidden flex items-center justify-center text-center p-5 rounded-xl shadow-lg bg-gradient-to-br from-[#479DFF] to-[#0072F5] text-white">
              <h3
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateFront(card.id, e.currentTarget.textContent || "")}
                className="text-xl font-bold"
              >
                {card.front}
              </h3>
            </div>
            {/* Back */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center text-center p-5 rounded-xl shadow-lg bg-[#C2DEFF]">
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateBack(card.id, e.currentTarget.textContent || "")}
                className="text-gray-800"
              >
                {card.back}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
