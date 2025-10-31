import { defineType, defineField } from "sanity"

export default defineType({
  name: "policyDocument",
  title: "Policy Document",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Policy Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier (e.g., privacy-policy, terms-of-use)",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "policyType",
      title: "Policy Type",
      type: "string",
      options: {
        list: [
          { title: "Privacy Policy", value: "privacy" },
          { title: "Terms of Use", value: "terms" },
          { title: "Service Agreement", value: "service" },
          { title: "Cookie Policy", value: "cookie" },
          { title: "Data Retention & Deletion", value: "data-retention" },
          { title: "AI Disclosure", value: "ai-disclosure" },
          { title: "Accessibility Statement", value: "accessibility" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "effectiveDate",
      title: "Effective Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      description: "e.g., 1.0, 2.1",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      description: "Brief overview of the policy (2-3 sentences)",
      rows: 3,
    }),
    defineField({
      name: "content",
      title: "Policy Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "Email for policy-related questions",
      initialValue: "Policies_and_Compliance@lxd360.com",
    }),
    defineField({
      name: "isPublished",
      title: "Published",
      type: "boolean",
      description: "Only published policies will appear on the website",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      policyType: "policyType",
      version: "version",
      isPublished: "isPublished",
    },
    prepare({ title, policyType, version, isPublished }) {
      return {
        title: title,
        subtitle: `${policyType} - v${version} ${isPublished ? "✓ Published" : "⚠ Draft"}`,
      }
    },
  },
  orderings: [
    {
      title: "Last Updated, New",
      name: "lastUpdatedDesc",
      by: [{ field: "lastUpdated", direction: "desc" }],
    },
    {
      title: "Policy Type",
      name: "policyTypeAsc",
      by: [{ field: "policyType", direction: "asc" }],
    },
  ],
})
