"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Upload } from "@phosphor-icons/react"

export default function UploadForm({ onUploadComplete }: { onUploadComplete?: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [assetKind, setAssetKind] = useState("2D Image")
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("title", title || file.name)
      formData.append("assetKind", assetKind)

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      })

      const json = await res.json()

      if (json.ok) {
        toast({
          title: "Success",
          description: "File uploaded successfully",
        })
        setFile(null)
        setTitle("")
        onUploadComplete?.()
      } else {
        toast({
          title: "Upload failed",
          description: json.error || "Unknown error",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="file">File</Label>
        <Input id="file" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} disabled={uploading} />
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder={file?.name || "Enter title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={uploading}
        />
      </div>

      <div>
        <Label htmlFor="assetKind">Asset Type</Label>
        <Select value={assetKind} onValueChange={setAssetKind} disabled={uploading}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2D Image">2D Image</SelectItem>
            <SelectItem value="360 Image">360 Image</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
            <SelectItem value="Audio">Audio</SelectItem>
            <SelectItem value="3D Artifact">3D Artifact</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={uploading || !file} className="w-full">
        <Upload className="mr-2" weight="duotone" />
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  )
}
