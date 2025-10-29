"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function ModalTrigger() {
  const [isOpen, setIsOpen] = useState(false)
  const [triggerText, setTriggerText] = useState("trigger link")
  const [modalTitle, setModalTitle] = useState("Modal Title")
  const [modalContent, setModalContent] = useState(
    "This is the content of the modal. It can be anything you want, including text, images, or even videos.",
  )

  return (
    <>
      <p className="leading-relaxed text-gray-700">
        You can include supplementary information that opens in a modal, like this{" "}
        <span onClick={() => setIsOpen(true)} className="text-[#0072F5] underline cursor-pointer hover:text-[#0056B8]">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setTriggerText(e.currentTarget.textContent || "")}
          >
            {triggerText}
          </span>
        </span>
        .
      </p>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-[500px] relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h3
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setModalTitle(e.currentTarget.textContent || "")}
              className="text-2xl font-bold mb-4 text-gray-800"
            >
              {modalTitle}
            </h3>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setModalContent(e.currentTarget.textContent || "")}
              className="leading-relaxed text-gray-700"
            >
              {modalContent}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
