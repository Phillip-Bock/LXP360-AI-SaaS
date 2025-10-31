"use client"

import { useState } from "react"

export function ReferencesBlock() {
  const [references, setReferences] = useState([
    "Clark, R. C., & Mayer, R. E. (2016). E-learning and the science of instruction. John Wiley & Sons.",
    "Knowles, M. S., Holton, E. F., & Swanson, R. A. (2014). The adult learner. Routledge.",
  ])

  const updateReference = (index: number, newValue: string) => {
    setReferences((prev) => {
      const newRefs = [...prev]
      newRefs[index] = newValue
      return newRefs
    })
  }

  return (
    <div className="bg-[#f8f9fa] p-5 rounded-lg text-sm">
      <h4 className="mt-0 text-[#0056B8] font-semibold mb-3">References & Citations</h4>
      <ol className="pl-5 space-y-2">
        {references.map((ref, index) => (
          <li
            key={index}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateReference(index, e.currentTarget.textContent || "")}
            className="outline-none focus:ring-2 focus:ring-[#70B3FF] rounded"
          >
            {ref}
          </li>
        ))}
      </ol>
    </div>
  )
}
