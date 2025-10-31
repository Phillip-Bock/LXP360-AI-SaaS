import { defineType, defineField } from "sanity"

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "heroBackground",
      title: "Hero Background Video/Image",
      type: "file",
      description: "Hero background (can be video or image)",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero CTA Button Link",
      type: "string",
    }),

    // Client Logos Section
    defineField({
      name: "clientLogosTitle",
      title: "Client Logos Section Title",
      type: "string",
      initialValue: "Strategic Partners",
    }),
    defineField({
      name: "clientLogos",
      title: "Client/Partner Logos",
      type: "array",
      description: "Upload 6-8 individual logos for scrolling banner",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "logo",
              title: "Logo Image",
              type: "image",
              description: "Transparent PNG, monochrome black, 200x80px",
            },
            {
              name: "companyName",
              title: "Company Name",
              type: "string",
            },
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
    }),

    // Features Section
    defineField({
      name: "featuresTitle",
      title: "Features Section Title",
      type: "string",
      initialValue: "Powerful Features for Modern Learning",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Feature Title",
              type: "string",
            },
            {
              name: "description",
              title: "Feature Description",
              type: "text",
            },
            {
              name: "icon",
              title: "Phosphor Icon Name",
              type: "string",
              description: "e.g., Sparkle, Lightning, Rocket, Brain, etc.",
            },
            {
              name: "image",
              title: "Feature Image (optional)",
              type: "image",
              description: "600x600px PNG with transparency",
            },
          ],
        },
      ],
    }),

    // Platform Screenshots Section
    defineField({
      name: "platformTitle",
      title: "Platform Section Title",
      type: "string",
      initialValue: "See LXP360 in Action",
    }),
    defineField({
      name: "platformScreenshots",
      title: "Platform Screenshots",
      type: "array",
      description: "3-4 screenshots of the platform interface",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Screenshot Title",
              type: "string",
            },
            {
              name: "description",
              title: "Screenshot Description",
              type: "text",
            },
            {
              name: "image",
              title: "Screenshot Image",
              type: "image",
              description: "1200x800px",
            },
          ],
        },
      ],
    }),

    // Testimonials Section
    defineField({
      name: "testimonialsTitle",
      title: "Testimonials Section Title",
      type: "string",
      initialValue: "What Our Clients Say",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "quote",
              title: "Quote",
              type: "text",
            },
            {
              name: "authorName",
              title: "Author Name",
              type: "string",
            },
            {
              name: "authorTitle",
              title: "Author Title",
              type: "string",
            },
            {
              name: "companyName",
              title: "Company Name",
              type: "string",
            },
            {
              name: "authorPhoto",
              title: "Author Photo",
              type: "image",
              description: "400x400px square",
            },
            {
              name: "companyLogo",
              title: "Company Logo",
              type: "image",
              description: "150x60px transparent PNG",
            },
          ],
        },
      ],
    }),

    // About Section
    defineField({
      name: "aboutTitle",
      title: "About Section Title",
      type: "string",
      initialValue: "Training the Future for the Future",
    }),
    defineField({
      name: "aboutDescription",
      title: "About Section Description",
      type: "text",
    }),
    defineField({
      name: "aboutImage",
      title: "About Section Image",
      type: "image",
      description: "1200x800px",
    }),

    // CTA Section
    defineField({
      name: "ctaTitle",
      title: "CTA Section Title",
      type: "string",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Section Description",
      type: "text",
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "ctaButtonLink",
      title: "CTA Button Link",
      type: "string",
    }),
    defineField({
      name: "ctaBackground",
      title: "CTA Background Image",
      type: "image",
      description: "1920x600px",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
        subtitle: "Main landing page content",
      }
    },
  },
})
