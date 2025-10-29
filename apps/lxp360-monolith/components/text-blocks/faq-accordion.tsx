"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqs = [
    {
      question: "What is e-learning?",
      answer: "E-learning is learning conducted via electronic media, typically on the internet.",
    },
    {
      question: "What is an LMS?",
      answer:
        "A Learning Management System is a software application for the administration, documentation, tracking, reporting, and delivery of educational courses.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-200 last:border-b-0">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left py-5 flex justify-between items-center text-lg font-medium hover:text-[#0072f5] transition-colors"
          >
            {faq.question}
            <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 pb-5" : "max-h-0"
            }`}
          >
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
