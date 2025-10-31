"use client"
import dynamic from "next/dynamic"

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

type Props = {
  url?: string | null
  mimeType?: string | null
  title?: string
}

export default function AssetPreview({ url, mimeType = "", title }: Props) {
  if (!url) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
        <p className="text-muted-foreground">No preview available</p>
      </div>
    )
  }

  // Image preview
  if (mimeType?.startsWith("image/") || /\.(png|jpe?g|gif|webp|svg)$/i.test(url)) {
    return (
      <img
        src={url || "/placeholder.svg"}
        alt={title || "Asset preview"}
        className="w-full h-auto max-h-[600px] object-contain rounded-lg"
      />
    )
  }

  // Video preview
  if (mimeType?.startsWith("video/") || /\.(mp4|webm|ogg)$/i.test(url)) {
    return (
      <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
        <ReactPlayer url={url} controls width="100%" height="100%" />
      </div>
    )
  }

  // Audio preview
  if (mimeType?.startsWith("audio/") || /\.(mp3|wav|ogg)$/i.test(url)) {
    return (
      <div className="w-full p-8 bg-muted rounded-lg">
        <ReactPlayer url={url} controls width="100%" height="60px" />
      </div>
    )
  }

  // 3D model preview
  if (mimeType?.includes("model") || /\.(glb|gltf)$/i.test(url)) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg p-4">
        <p className="text-muted-foreground mb-4">3D Model Preview</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Download to view
        </a>
      </div>
    )
  }

  // 360 image preview
  if (/360|equirectangular/i.test(mimeType || "")) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg p-4">
        <p className="text-muted-foreground mb-4">360° Image</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Open in new tab
        </a>
      </div>
    )
  }

  // Fallback for unsupported types
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg p-4">
      <p className="text-muted-foreground mb-4">Preview unavailable inline. Download to view.</p>
      <a href={url} target="_blank" rel="noopener noreferrer" download className="text-primary hover:underline">
        Download
      </a>
    </div>
  )
}
