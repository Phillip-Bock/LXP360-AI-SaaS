"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ArrowUpDown } from "lucide-react"

export default function SortableTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [data, setData] = useState([
    { standard: "SCORM", released: "1999", mobile: "No" },
    { standard: "AICC", released: "1993", mobile: "No" },
    { standard: "xAPI", released: "2013", mobile: "Yes" },
    { standard: "cmi5", released: "2016", mobile: "Yes" },
  ])

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) => val.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const sortByColumn = (key: keyof (typeof data)[0]) => {
    const sorted = [...data].sort((a, b) => a[key].localeCompare(b[key]))
    setData(sorted)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <h4 className="text-lg font-semibold text-[#003066] mb-4">Sortable/Filterable Data Table</h4>
      <Input
        type="text"
        placeholder="Filter table..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th onClick={() => sortByColumn("standard")} className="text-left p-3 cursor-pointer hover:bg-gray-100">
              Standard <ArrowUpDown className="inline w-4 h-4 ml-1" />
            </th>
            <th onClick={() => sortByColumn("released")} className="text-left p-3 cursor-pointer hover:bg-gray-100">
              Released <ArrowUpDown className="inline w-4 h-4 ml-1" />
            </th>
            <th onClick={() => sortByColumn("mobile")} className="text-left p-3 cursor-pointer hover:bg-gray-100">
              Mobile Support <ArrowUpDown className="inline w-4 h-4 ml-1" />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="p-3">{row.standard}</td>
              <td className="p-3">{row.released}</td>
              <td className="p-3">{row.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
