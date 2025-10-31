"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"

export function SynthesizationForm() {
  const [transcript, setTranscript] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!transcript.trim()) return

    setIsGenerating(true)

    try {
      const response = await fetch("/api/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      })

      if (!response.ok) throw new Error("Failed to generate content")

      const data = await response.json()
      setGeneratedContent(data.content)
    } catch (error) {
      console.error("[v0] Error generating content:", error)
      alert("Failed to generate content. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-2xl text-[#001d3d]">Transcript Input</CardTitle>
          <CardDescription className="text-[#003066]">
            Paste your lecture transcript below to generate synthesized course content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transcript" className="text-[#001d3d] font-medium">
              Lecture Transcript
            </Label>
            <Textarea
              id="transcript"
              placeholder="Paste your lecture transcript here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="min-h-[300px] resize-y font-mono text-sm"
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={!transcript.trim() || isGenerating}
            className="w-full bg-[#003066] hover:bg-[#001d3d] text-white"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Course Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      {generatedContent && (
        <Card className="border-border/40 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-2xl text-[#001d3d]">Generated Content</CardTitle>
            <CardDescription className="text-[#003066]">
              AI-synthesized course material from your transcript
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-[#001d3d] leading-relaxed">{generatedContent}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
