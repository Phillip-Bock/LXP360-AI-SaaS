"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Upload, CheckCircle, XCircle, CircleNotch } from "@phosphor-icons/react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type ImportResult = {
  success: number
  failed: number
  errors: Array<{ row: number; email: string; error: string }>
}

export function BulkImportForm() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file",
          variant: "destructive",
        })
        return
      }
      setFile(selectedFile)
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append("file", file)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 500)

      const response = await fetch("/api/admin/bulk-import", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      setResult(data)

      if (data.success > 0) {
        toast({
          title: "Import completed",
          description: `Successfully imported ${data.success} user(s)`,
        })
      }

      if (data.failed > 0) {
        toast({
          title: "Some imports failed",
          description: `${data.failed} user(s) could not be imported`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error uploading file:", error)
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading the file",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setProgress(0)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="csv-file" className="text-[#F5F5F5]">
            Select CSV File
          </Label>
          <div className="flex gap-4">
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={isUploading}
              className="bg-[#001D3D] border-[#7103A0] text-[#F5F5F5]"
            />
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="bg-[#0056B8] hover:bg-[#019EF3] text-[#F5F5F5] border border-[#7103A0] shadow-[0_2px_0_0_rgba(113,3,160,0.75)]"
            >
              {isUploading ? (
                <>
                  <CircleNotch className="mr-2 h-4 w-4 animate-spin" weight="bold" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" weight="duotone" />
                  Upload & Import
                </>
              )}
            </Button>
          </div>
          {file && (
            <p className="text-sm text-[#F5F5F5]/70">
              Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>

        {isUploading && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-[#F5F5F5]/70 text-center">Processing... {progress}%</p>
          </div>
        )}
      </div>

      {result && (
        <Card className="bg-[#001D3D] border-[#7103A0]">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-[#F5F5F5] mb-4">Import Results</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-[#3AD20C]/10 border border-[#3AD20C] rounded-lg">
                <CheckCircle className="w-8 h-8 text-[#3AD20C]" weight="duotone" />
                <div>
                  <p className="text-2xl font-bold text-[#3AD20C]">{result.success}</p>
                  <p className="text-sm text-[#F5F5F5]/70">Successful</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#DC0404]/10 border border-[#DC0404] rounded-lg">
                <XCircle className="w-8 h-8 text-[#DC0404]" weight="duotone" />
                <div>
                  <p className="text-2xl font-bold text-[#DC0404]">{result.failed}</p>
                  <p className="text-sm text-[#F5F5F5]/70">Failed</p>
                </div>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F5F5]">Errors:</h4>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {result.errors.map((error, index) => (
                    <div key={index} className="p-3 bg-[#DC0404]/10 border border-[#DC0404] rounded text-sm">
                      <p className="text-[#F5F5F5]">
                        <span className="font-semibold">Row {error.row}:</span> {error.email}
                      </p>
                      <p className="text-[#DC0404] text-xs mt-1">{error.error}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
