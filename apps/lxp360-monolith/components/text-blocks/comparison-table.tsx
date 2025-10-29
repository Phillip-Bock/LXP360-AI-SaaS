"use client"

import { Check, X } from "lucide-react"

export default function ComparisonTable() {
  const data = [
    { feature: "User Accounts", basic: "1", pro: "10", enterprise: "Unlimited" },
    { feature: "Cloud Storage", basic: "10 GB", pro: "100 GB", enterprise: "Unlimited" },
    { feature: "Mobile Support", basic: false, pro: true, enterprise: true },
    { feature: "24/7 Support", basic: false, pro: false, enterprise: true },
  ]

  const renderCell = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-green-600 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-600 mx-auto" />
      )
    }
    return value
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <h4 className="text-lg font-semibold text-[#003066] mb-4">Comparison Table</h4>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-3">Feature</th>
            <th className="text-left p-3">Basic Plan</th>
            <th className="text-left p-3">Pro Plan</th>
            <th className="text-left p-3">Enterprise Plan</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="p-3">{row.feature}</td>
              <td className="p-3 text-center">{renderCell(row.basic)}</td>
              <td className="p-3 text-center">{renderCell(row.pro)}</td>
              <td className="p-3 text-center">{renderCell(row.enterprise)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
