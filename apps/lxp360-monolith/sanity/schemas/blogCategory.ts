import { defineType, defineField } from "sanity"

export default defineType({
  name: "blogCategory",
  title: "Blog Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
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
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "color",
      title: "Category Color",
      type: "string",
      description: "Hex color code for category badge (e.g., #0056B8)",
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/),
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare(selection) {
      const { title, description } = selection
      return {
        title,
        subtitle: description || "No description",
      }
    },
  },
})
