"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"

export default function DefinitionList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [definitions, setDefinitions] = useState([
    { term: "SCORM", definition: "Sharable Content Object Reference Model, a standard for e-learning content." },
    { term: "xAPI", definition: "Experience API, a newer standard that tracks learning experiences." },
    { term: "LMS", definition: "Learning Management System, a platform for delivering online courses." },
  ])

  const filteredDefinitions = definitions.filter(
    (def) =>
      def.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      def.definition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const downloadCSV = () => {
    const csvContent = "Term,Definition\n" + definitions.map((d) => `"${d.term}","${d.definition}"`).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "definitions.csv"
    a.click()
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div className="flex gap-3 mb-6">
        <Input
          type="text"
          placeholder="Search terms or definitions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button onClick={downloadCSV} className="bg-[#0072f5] hover:bg-[#003066]">
          <Download className="w-4 h-4 mr-2" />
          Download CSV
        </Button>
      </div>
      <dl className="space-y-4">
        {filteredDefinitions.map((def, index) => (
          <div key={index} className="flex border-b border-gray-200 pb-4">
            <dt className="font-bold w-1/3 text-[#003066]">{def.term}</dt>
            <dd className="w-2/3">{def.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
