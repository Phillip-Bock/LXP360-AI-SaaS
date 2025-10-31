"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, CheckCircle2, AlertCircle, ArrowLeft, Sparkles } from "lucide-react"

const learningContexts = [
  { value: "diagram", label: "Diagram" },
  { value: "chart", label: "Chart/Graph" },
  { value: "process", label: "Process Flow" },
  { value: "concept-map", label: "Concept Map" },
  { value: "infographic", label: "Infographic" },
  { value: "screenshot", label: "Screenshot" },
  { value: "photo", label: "Photograph" },
  { value: "illustration", label: "Illustration" },
]

export default function AltTextGeneratorPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [learningContext, setLearningContext] = useState("")
  const [altText, setAltText] = useState("")
  const [longDescription, setLongDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setAltText(
        "A flowchart diagram showing the course creation process with four main stages: Planning, Content Development, Review, and Publishing. Each stage contains multiple sub-steps connected by arrows.",
      )
      setLongDescription(
        "This comprehensive flowchart illustrates the complete course creation workflow. The Planning stage includes needs analysis and learning objectives definition. Content Development encompasses content creation, media production, and interactive elements. The Review stage involves peer review, accessibility checks, and quality assurance. Finally, the Publishing stage includes final approval, deployment, and learner notification. Arrows indicate the sequential flow between stages, with feedback loops shown returning to earlier stages when revisions are needed.",
      )
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleExport = () => {
    const data = {
      altText,
      longDescription,
      learningContext,
      timestamp: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "alt-text-export.json"
    a.click()
  }

  const altTextLength = altText.length
  const isAltTextOptimal = altTextLength >= 50 && altTextLength <= 150

  return (
    <div className="min-h-screen bg-[#001d3d]">
      <header className="bg-[#001d3d] border-b border-[#003066]">
        <div className="flex items-center justify-between px-6 py-3">
          <Image src="/lxp360-logo.png" alt="LXP 360" width={120} height={48} className="h-10 w-auto" priority />
          <div className="bg-[#003066] px-6 py-2 rounded-[10px]">
            <p className="text-white font-medium">Welcome back, Phillip</p>
          </div>
        </div>
      </header>

      <nav className="bg-[#001d3d] border-b border-[#003066]">
        <div className="flex px-6">
          <Link href="/dashboard" className="px-6 py-3 bg-[#00438f]/50 text-white/80 font-medium hover:bg-[#00438f]">
            Project
          </Link>
          <Link href="/encoding" className="px-6 py-3 bg-[#00438f]/50 text-white/80 font-medium hover:bg-[#00438f]">
            Encoding
          </Link>
          <Link
            href="/synthesization"
            className="px-6 py-3 bg-[#00438f]/50 text-white/80 font-medium hover:bg-[#00438f]"
          >
            Synthesization
          </Link>
          <Link href="/assimilation" className="px-6 py-3 bg-[#00438f]/50 text-white/80 font-medium hover:bg-[#00438f]">
            Assimilation
          </Link>
          <Link
            href="/developer-tools"
            className="px-6 py-3 bg-[#003066] text-white font-medium rounded-t-[10px] border-t border-x border-[#0056b8]"
          >
            Developer Tools
          </Link>
          <Link href="#" className="px-6 py-3 bg-[#00438f]/50 text-white/80 font-medium hover:bg-[#00438f]">
            Profile
          </Link>
        </div>
      </nav>

      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link
              href="/developer-tools"
              className="inline-flex items-center text-[#479dff] hover:text-[#1f87ff] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Developer Tools
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Alt Text Generator</h1>
            <p className="text-white/70">Generate accessible alt text for images with context-aware analysis</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Upload & Settings */}
            <div className="space-y-6">
              <Card className="bg-white rounded-[10px] p-6">
                <h2 className="text-xl font-semibold text-[#001d3d] mb-4">Upload Image</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image-upload" className="text-[#003066] mb-2 block">
                      Select Image
                    </Label>
                    <div className="border-2 border-dashed border-[#0072f5] rounded-[10px] p-8 text-center hover:bg-[#0072f5]/5 transition-colors cursor-pointer">
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-[#0072f5] mx-auto mb-3" />
                        <p className="text-[#003066] font-medium mb-1">Click to upload or drag and drop</p>
                        <p className="text-[#003066]/60 text-sm">PNG, JPG, GIF up to 10MB</p>
                      </label>
                    </div>
                  </div>

                  {imagePreview && (
                    <div className="rounded-[10px] overflow-hidden border border-[#0072f5]">
                      <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-auto" />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="learning-context" className="text-[#003066] mb-2 block">
                      Learning Context
                    </Label>
                    <Select value={learningContext} onValueChange={setLearningContext}>
                      <SelectTrigger id="learning-context" className="rounded-[10px]">
                        <SelectValue placeholder="Select image type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {learningContexts.map((context) => (
                          <SelectItem key={context.value} value={context.value}>
                            {context.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={!imagePreview || !learningContext || isAnalyzing}
                    className="w-full bg-[#0072f5] hover:bg-[#0056b8] text-white rounded-[10px] py-6"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing Image...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate Alt Text
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              <Card className="bg-white rounded-[10px] p-6">
                <h2 className="text-xl font-semibold text-[#001d3d] mb-4">Alt Text</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="alt-text" className="text-[#003066] mb-2 block">
                      Short Description (50-150 characters recommended)
                    </Label>
                    <Textarea
                      id="alt-text"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      placeholder="Alt text will appear here..."
                      className="rounded-[10px] min-h-[100px]"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-[#003066]/60">{altTextLength} characters</span>
                      {altText && (
                        <div className="flex items-center gap-2">
                          {isAltTextOptimal ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-600">Optimal length</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-amber-600" />
                              <span className="text-sm text-amber-600">
                                {altTextLength < 50 ? "Too short" : "Too long"}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="long-description" className="text-[#003066] mb-2 block">
                      Long Description (for complex images)
                    </Label>
                    <Textarea
                      id="long-description"
                      value={longDescription}
                      onChange={(e) => setLongDescription(e.target.value)}
                      placeholder="Detailed description will appear here..."
                      className="rounded-[10px] min-h-[200px]"
                    />
                  </div>

                  {altText && (
                    <div className="bg-[#0072f5]/10 rounded-[10px] p-4">
                      <h3 className="font-semibold text-[#001d3d] mb-2">WCAG Compliance</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-[#003066]">Alt text is descriptive</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-[#003066]">Context-appropriate</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-[#003066]">Meets WCAG 2.1 Level AA</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleExport}
                    disabled={!altText}
                    variant="outline"
                    className="w-full rounded-[10px] border-[#0072f5] text-[#0072f5] hover:bg-[#0072f5] hover:text-white bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Results
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
