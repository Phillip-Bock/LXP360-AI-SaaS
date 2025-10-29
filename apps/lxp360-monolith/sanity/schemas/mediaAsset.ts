import { defineType, defineField } from "sanity"

export default defineType({
  name: "mediaAsset",
  title: "Media Asset",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "assetFile",
      title: "Asset File",
      type: "file",
    }),
    defineField({
      name: "image",
      title: "Image (for image assets)",
      type: "image",
    }),
    defineField({
      name: "mimeType",
      title: "MIME Type",
      type: "string",
    }),
    defineField({
      name: "assetKind",
      title: "Asset Kind",
      type: "string",
      options: {
        list: [
          { title: "2D Image", value: "2D Image" },
          { title: "360 Image", value: "360 Image" },
          { title: "Video", value: "Video" },
          { title: "Audio", value: "Audio" },
          { title: "3D Artifact", value: "3D Artifact" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "In Review", value: "in_review" },
          { title: "Approved", value: "approved" },
          { title: "Published", value: "published" },
        ],
      },
      initialValue: "draft",
    }),
    defineField({
      name: "project",
      title: "Project",
      type: "string",
    }),
    defineField({
      name: "lockedBy",
      title: "Locked By",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "lockedAt",
      title: "Locked At",
      type: "datetime",
    }),
    defineField({
      name: "lockExpires",
      title: "Lock Expires",
      type: "datetime",
    }),
    defineField({
      name: "checkedOutBy",
      title: "Checked Out By",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "checkedOutAt",
      title: "Checked Out At",
      type: "datetime",
    }),
    defineField({
      name: "createdBySupabaseId",
      title: "Created By (Supabase ID)",
      type: "string",
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
    }),
    defineField({
      name: "version",
      title: "Version",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "usageCount",
      title: "Usage Count",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "lastDownloadedAt",
      title: "Last Downloaded At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      status: "status",
    },
    prepare({ title, media, status }) {
      return {
        title: title || "Untitled",
        subtitle: status || "draft",
        media,
      }
    },
  },
})
