"use client"

import { useEffect, useState } from "react"
import { sanityClient } from "@/lib/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import type { MediaAsset } from "@/lib/types/media-asset"
import AssetPreview from "@/components/media/asset-preview"
import UploadForm from "@/components/media/upload-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MagnifyingGlass, X, LockKey, LockKeyOpen, Download } from "@phosphor-icons/react"

const builder = imageUrlBuilder(sanityClient)

function urlFor(source: any) {
  return builder.image(source)
}

export default function MediaAssetsPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [selected, setSelected] = useState<MediaAsset | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const GROQ = `*[_type == "mediaAsset"] | order(_createdAt desc){
    _id, title, description, tags, status, lockedBy, lockedAt, lockExpires,
    checkedOutBy, checkedOutAt, assetFile, image, mimeType, assetKind,
    project, version, usageCount, updatedAt
  }`

  const loadAssets = async () => {
    setLoading(true)
    try {
      const res = await sanityClient.fetch(GROQ)
      const mapped = (res || []).map((r: any) => {
        let url = r.assetFile?.asset?.url
        if (!url && r.image) {
          url = urlFor(r.image).url()
        }
        return { ...r, url }
      })
      setAssets(mapped)
    } catch (error) {
      console.error("Failed to load assets:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAssets()

    // Set up real-time listener
    const subscription = sanityClient.listen(GROQ).subscribe(() => {
      loadAssets()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const filtered = assets.filter((a) => {
    const tags = (a.tags || []).join(" ").toLowerCase()
    const query = searchQuery.toLowerCase()
    return !searchQuery || (a.title || "").toLowerCase().includes(query) || tags.includes(query)
  })

  const handleLock = async (assetId: string) => {
    try {
      const res = await fetch(`/api/media/patch/${assetId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lockedAt: new Date().toISOString(),
          lockedBy: { _ref: "current-user" },
        }),
      })
      const json = await res.json()
      if (json.ok) {
        loadAssets()
      }
    } catch (error) {
      console.error("Failed to lock asset:", error)
    }
  }

  const handleUnlock = async (assetId: string) => {
    try {
      const res = await fetch(`/api/media/patch/${assetId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unlock: true }),
      })
      const json = await res.json()
      if (json.ok) {
        loadAssets()
      }
    } catch (error) {
      console.error("Failed to unlock asset:", error)
    }
  }

  const handleUpdateField = async (assetId: string, field: string, value: any) => {
    try {
      await fetch(`/api/media/patch/${assetId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      })
    } catch (error) {
      console.error("Failed to update field:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading assets...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Media Asset Manager</h1>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList>
          <TabsTrigger value="browse">Browse Assets</TabsTrigger>
          <TabsTrigger value="upload">Upload New</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MagnifyingGlass
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
                weight="duotone"
              />
              <Input
                placeholder="Search by title or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                <X weight="duotone" />
              </Button>
            )}
          </div>

          {!assets.length ? (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">No assets yet. Upload one to get started.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assets ({filtered.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {filtered.map((asset) => (
                      <div
                        key={asset._id}
                        onClick={() => setSelected(asset)}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selected?._id === asset._id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                        }`}
                      >
                        <h3 className="font-semibold">{asset.title}</h3>
                        <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
                          <span className="px-2 py-1 bg-muted rounded">{asset.status || "draft"}</span>
                          {asset.tags?.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-muted rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{selected ? selected.title : "Select an asset"}</CardTitle>
                </CardHeader>
                <CardContent>
                  {selected ? (
                    <div className="space-y-4">
                      <AssetPreview url={selected.url} mimeType={selected.mimeType} title={selected.title} />

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Title</label>
                          <Input
                            defaultValue={selected.title}
                            onBlur={(e) => handleUpdateField(selected._id, "title", e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium">Description</label>
                          <Textarea
                            defaultValue={selected.description}
                            onBlur={(e) => handleUpdateField(selected._id, "description", e.target.value)}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => window.open(selected.url || "", "_blank")}>
                            <Download className="mr-2" weight="duotone" />
                            Download
                          </Button>

                          {selected.lockedBy ? (
                            <Button variant="outline" onClick={() => handleUnlock(selected._id)}>
                              <LockKeyOpen className="mr-2" weight="duotone" />
                              Unlock
                            </Button>
                          ) : (
                            <Button variant="outline" onClick={() => handleLock(selected._id)}>
                              <LockKey className="mr-2" weight="duotone" />
                              Lock
                            </Button>
                          )}
                        </div>

                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Status: {selected.status || "—"}</p>
                          <p>Locked by: {selected.lockedBy ? "User" : "Not locked"}</p>
                          <p>Version: {selected.version || 1}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                      Select an asset to view details
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Asset</CardTitle>
            </CardHeader>
            <CardContent>
              <UploadForm onUploadComplete={loadAssets} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
