import { defineField, defineType } from "sanity"

export default defineType({
  name: "advertisedCourse",
  title: "Advertised Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Course Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "detailedDescription",
      title: "Detailed Description",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Leadership", value: "Leadership" },
          { title: "Technical Skills", value: "Technical Skills" },
          { title: "Compliance", value: "Compliance" },
          { title: "Soft Skills", value: "Soft Skills" },
          { title: "Professional Development", value: "Professional Development" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "Beginner" },
          { title: "Intermediate", value: "Intermediate" },
          { title: "Advanced", value: "Advanced" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "instructor",
      title: "Instructor Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Course Duration",
      type: "string",
      description: 'e.g., "8 weeks", "12 hours", "3 months"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "image",
      title: "Course Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "previewVideo",
      title: "Preview Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "hasCertificate",
      title: "Includes Certificate",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "hasOfflineDownload",
      title: "Offline Download Available",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "factSheet",
      title: "Course Fact Sheet (PDF)",
      type: "file",
      options: {
        accept: "application/pdf",
      },
    }),
    defineField({
      name: "featured",
      title: "Featured Course",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      difficulty: "difficulty",
      media: "image",
    },
    prepare(selection) {
      const { title, category, difficulty, media } = selection
      return {
        title,
        subtitle: `${category} • ${difficulty}`,
        media,
      }
    },
  },
})
