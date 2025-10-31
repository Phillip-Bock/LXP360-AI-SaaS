import { defineType, defineField } from "sanity"

export default defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "supabaseId",
      title: "Supabase ID",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Admin", value: "admin" },
          { title: "Designer", value: "designer" },
          { title: "Viewer", value: "viewer" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
  },
})
