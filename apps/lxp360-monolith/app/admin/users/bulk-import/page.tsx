"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BulkImportForm } from "@/components/admin/bulk-import-form"
import { FileSpreadsheet, Users, AlertCircle } from "lucide-react"

export const dynamic = "force-dynamic"

export default function BulkImportPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#001D3D]">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Link href="/admin/users">
            <Button variant="ghost" className="text-[#F5F5F5] hover:bg-[#0056B8]/20">
              ← Back to Users
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#F5F5F5] mb-2">Bulk User Import</h1>
          <p className="text-[#F5F5F5]/70">Upload a CSV file to create multiple users at once</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#232323] border-[#7103A0]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0056B8]/20 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5 text-[#019EF3]" />
                </div>
                <div>
                  <CardTitle className="text-[#F5F5F5]">CSV Format</CardTitle>
                  <CardDescription className="text-[#F5F5F5]/70">Required columns</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-[#F5F5F5]/70 space-y-1">
                <li>• email (required)</li>
                <li>• first_name (required)</li>
                <li>• last_name (required)</li>
                <li>• role (optional)</li>
                <li>• organization_id (optional)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#232323] border-[#7103A0]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0056B8]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#019EF3]" />
                </div>
                <div>
                  <CardTitle className="text-[#F5F5F5]">Default Password</CardTitle>
                  <CardDescription className="text-[#F5F5F5]/70">For all imported users</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#F5F5F5]/70">
                All users will be created with the password: <code className="text-[#019EF3]">TestUser77!</code>
              </p>
              <p className="text-xs text-[#F5F5F5]/50 mt-2">
                Users will be prompted to change their password on first login.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#232323] border-[#7103A0]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FF781F]/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[#FF781F]" />
                </div>
                <div>
                  <CardTitle className="text-[#F5F5F5]">Important</CardTitle>
                  <CardDescription className="text-[#F5F5F5]/70">Before importing</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-[#F5F5F5]/70 space-y-1">
                <li>• Duplicate emails will be skipped</li>
                <li>• Invalid data will be reported</li>
                <li>• Process may take a few minutes</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#232323] border-[#7103A0]">
          <CardHeader>
            <CardTitle className="text-[#F5F5F5]">Upload CSV File</CardTitle>
            <CardDescription className="text-[#F5F5F5]/70">
              Select a CSV file containing user data to import
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BulkImportForm />
          </CardContent>
        </Card>

        <Card className="bg-[#232323] border-[#7103A0] mt-6">
          <CardHeader>
            <CardTitle className="text-[#F5F5F5]">Example CSV</CardTitle>
            <CardDescription className="text-[#F5F5F5]/70">Download a sample CSV template</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-[#001D3D] p-4 rounded-lg text-xs text-[#019EF3] overflow-x-auto">
              {`email,first_name,last_name,role,organization_id
john.doe@example.com,John,Doe,learner,
jane.smith@company.com,Jane,Smith,instructor,11111111-1111-1111-1111-111111111111
admin@org.com,Admin,User,admin,22222222-2222-2222-2222-222222222222`}
            </pre>
            <Button
              variant="outline"
              className="mt-4 border-[#7103A0] text-[#F5F5F5] hover:bg-[#0056B8]/20 bg-transparent"
              onClick={() => {
                const csvContent = `email,first_name,last_name,role,organization_id\njohn.doe@example.com,John,Doe,learner,\njane.smith@company.com,Jane,Smith,instructor,\nadmin@org.com,Admin,User,admin,`
                const blob = new Blob([csvContent], { type: "text/csv" })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "user-import-template.csv"
                a.click()
              }}
            >
              Download Template
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
