"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface ImageItem {
  id: string
  url: string
  caption: string
  alt: string
}

export function ImageGallery() {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: "1",
      url: "/learning-environment.jpg",
      caption: "Modern Learning Environment",
      alt: "Modern learning environment",
    },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEditing, setIsEditing] = useState(false)

  const addImage = () => {
    const newImage: ImageItem = {
      id: Date.now().toString(),
      url: "/educational-content.png",
      caption: "New Image",
      alt: "New image description",
    }
    setImages([...images, newImage])
  }

  const removeImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id))
    if (currentIndex >= images.length - 1) {
      setCurrentIndex(Math.max(0, images.length - 2))
    }
  }

  const updateImage = (id: string, field: keyof ImageItem, value: string) => {
    setImages(images.map((img) => (img.id === id ? { ...img, [field]: value } : img)))
  }

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length)
  }

  return (
    <Card className="p-6 border-l-4 border-l-[#0072f5]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#001d3d]">Image Gallery</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Done" : "Edit"}
          </Button>
          {isEditing && (
            <Button variant="outline" size="sm" onClick={addImage}>
              <Plus className="w-4 h-4 mr-1" />
              Add Image
            </Button>
          )}
        </div>
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          {/* Main Image Display */}
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            <Image
              src={images[currentIndex].url || "/placeholder.svg"}
              alt={images[currentIndex].alt}
              fill
              className="object-cover"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Caption */}
          {!isEditing && (
            <p className="text-sm text-center text-muted-foreground italic">{images[currentIndex].caption}</p>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentIndex
                      ? "border-[#0072f5] scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img.url || "/placeholder.svg"} alt={img.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Edit Mode */}
          {isEditing && (
            <div className="space-y-4 border-t pt-4">
              {images.map((img) => (
                <Card key={img.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium">Image {images.indexOf(img) + 1}</h4>
                    <Button variant="ghost" size="sm" onClick={() => removeImage(img.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={img.url}
                        onChange={(e) => updateImage(img.id, "url", e.target.value)}
                        placeholder="Enter image URL"
                      />
                    </div>
                    <div>
                      <Label>Caption</Label>
                      <Input
                        value={img.caption}
                        onChange={(e) => updateImage(img.id, "caption", e.target.value)}
                        placeholder="Enter caption"
                      />
                    </div>
                    <div>
                      <Label>Alt Text (for accessibility)</Label>
                      <Input
                        value={img.alt}
                        onChange={(e) => updateImage(img.id, "alt", e.target.value)}
                        placeholder="Describe the image"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
