import { defineType, defineField } from "sanity"

export const aboutPageNew = defineType({
  name: "aboutPageNew",
  title: "About Page (New)",
  type: "document",
  fields: [
    // Section 1: Hero
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "badge",
          title: "Badge Text",
          type: "string",
          initialValue: "Transformative Learning Driving True Behavioral Change",
        },
        {
          name: "headline",
          title: "Headline",
          type: "string",
          initialValue: "Get to know LXD360",
        },
        {
          name: "tagline",
          title: "Tagline",
          type: "string",
          initialValue: "Training the Future for the Future",
        },
        {
          name: "heroImage",
          title: "Hero Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    // Section 2: About / Our Story
    defineField({
      name: "aboutSection",
      title: "About Section",
      type: "object",
      fields: [
        {
          name: "badge",
          title: "Badge Text",
          type: "string",
          initialValue: "Our Story",
        },
        {
          name: "headline",
          title: "Headline",
          type: "string",
          initialValue: "Get to know LXD360",
        },
        {
          name: "paragraph1",
          title: "Paragraph 1",
          type: "text",
          rows: 4,
        },
        {
          name: "paragraph2",
          title: "Paragraph 2",
          type: "text",
          rows: 4,
        },
        {
          name: "image",
          title: "Section Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    // Section 3: Logo Defined
    defineField({
      name: "logoSection",
      title: "Logo Defined Section",
      type: "object",
      fields: [
        {
          name: "headline",
          title: "Headline",
          type: "string",
          initialValue: "LXD360: The Story Behind the Name",
        },
        {
          name: "logo3D",
          title: "3D Logo Image",
          type: "image",
          description: "Upload the 3D logo that will rotate",
          options: {
            hotspot: true,
          },
        },
        {
          name: "paragraph1",
          title: "Paragraph 1",
          type: "text",
          rows: 4,
        },
        {
          name: "paragraph2",
          title: "Paragraph 2",
          type: "text",
          rows: 4,
        },
        {
          name: "paragraph3",
          title: "Paragraph 3",
          type: "text",
          rows: 4,
        },
      ],
    }),

    // Section 4: Values - LEARN
    defineField({
      name: "valuesSection",
      title: "Values Section (LEARN)",
      type: "object",
      fields: [
        {
          name: "headline",
          title: "Headline",
          type: "string",
          initialValue: "L E A R N",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        },
        {
          name: "ctaText",
          title: "CTA Button Text",
          type: "string",
          initialValue: "Let's LEARN Together",
        },
        {
          name: "values",
          title: "Values",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "letter",
                  title: "Letter",
                  type: "string",
                  validation: (Rule) => Rule.required().max(1),
                },
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "letterImage",
                  title: "Letter Image",
                  type: "image",
                  description: "Artistic image of the letter",
                  options: {
                    hotspot: true,
                  },
                },
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "letter",
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().length(5),
        },
      ],
    }),

    // Section 5: Founder
    defineField({
      name: "founderSection",
      title: "Founder Section",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Founder Name",
          type: "string",
          initialValue: "Phillip Bock, Ph.D.",
        },
        {
          name: "photo",
          title: "Founder Photo",
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "magazineUrl",
          title: "Magazine Article URL",
          type: "url",
          description: "URL to the Continental Who's Who magazine article",
        },
        {
          name: "magazineDescription",
          title: "Magazine Description",
          type: "string",
          initialValue: "Featured on page 170 and bio on page 238 - Continental Who's Who Inner Circle Magazine",
        },
        {
          name: "bio",
          title: "Biography",
          type: "array",
          of: [{ type: "block" }],
          description: "Founder biography (supports rich text)",
        },
        {
          name: "badge",
          title: "Achievement Badge",
          type: "string",
          initialValue: "Continental Who's Who Inner Circle Magazine Inductee",
        },
      ],
    }),

    // Section 6: Demo Request CTA
    defineField({
      name: "ctaSection",
      title: "CTA Section",
      type: "object",
      fields: [
        {
          name: "headline",
          title: "Headline",
          type: "string",
          initialValue: "Stop Training. Start Transforming.",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        },
        {
          name: "primaryButtonText",
          title: "Primary Button Text",
          type: "string",
          initialValue: "Request a Demo",
        },
        {
          name: "primaryButtonLink",
          title: "Primary Button Link",
          type: "string",
          initialValue: "#demo",
        },
        {
          name: "secondaryButtonText",
          title: "Secondary Button Text",
          type: "string",
          initialValue: "Watch Video",
        },
        {
          name: "secondaryButtonLink",
          title: "Secondary Button Link",
          type: "string",
          initialValue: "#video",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page (New)",
      }
    },
  },
})
