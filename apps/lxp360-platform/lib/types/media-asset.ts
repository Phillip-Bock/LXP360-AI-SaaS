export type MediaAsset = {
  _id: string
  _type: "mediaAsset"
  title?: string
  description?: string
  tags?: string[]
  status?: "draft" | "in_review" | "approved" | "published"
  lockedBy?: { _ref?: string } | null
  lockedAt?: string | null
  lockExpires?: string | null
  checkedOutBy?: { _ref?: string } | null
  checkedOutAt?: string | null
  mimeType?: string
  assetFile?: {
    asset: {
      _ref: string
      _type: "reference"
      url?: string
    }
  }
  image?: any
  assetKind?: "2D Image" | "360 Image" | "Video" | "Audio" | "3D Artifact" | "Other"
  project?: string
  createdBySupabaseId?: string
  updatedAt?: string
  version?: number
  usageCount?: number
  lastDownloadedAt?: string
  url?: string
}
