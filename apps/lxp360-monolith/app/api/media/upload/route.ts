import { type NextRequest, NextResponse } from "next/server"
import { sanityServerClient } from "@/lib/sanity/server-client"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const assetKind = formData.get("assetKind") as string

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 })
    }

    // Upload file to Sanity
    const buffer = Buffer.from(await file.arrayBuffer())
    const uploadedAsset = await sanityServerClient.assets.upload("file", buffer, {
      filename: file.name,
      contentType: file.type,
    })

    // Create media asset document
    const doc = await sanityServerClient.create({
      _type: "mediaAsset",
      title: title || file.name,
      assetKind: assetKind || "Other",
      mimeType: file.type,
      status: "draft",
      version: 1,
      usageCount: 0,
      assetFile: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: uploadedAsset._id,
        },
      },
    })

    return NextResponse.json({ ok: true, asset: doc })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 },
    )
  }
}
