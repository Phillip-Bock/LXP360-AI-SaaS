import { defineType, defineField } from "sanity"

export default defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "backgroundVideo",
          title: "Background Video",
          type: "file",
          description: "Optional: Looping background video (MP4, max 50MB, 1920x1080px, 10-15 seconds)",
          options: {
            accept: "video/mp4",
          },
        },
        {
          name: "backgroundImage",
          title: "Background Image (Fallback)",
          type: "image",
          description: "Fallback if no video, or mobile background (1920x1080px)",
        },
        {
          name: "badge",
          title: "Badge Text",
          type: "string",
          description: 'e.g., "COMPREHENSIVE SERVICE SUITE"',
        },
        {
          name: "headline",
          title: "Headline",
          type: "string",
        },
        {
          name: "subheadline",
          title: "Subheadline",
          type: "text",
        },
      ],
    }),

    // Hero Stats
    defineField({
      name: "heroStats",
      title: "Hero Stats",
      type: "array",
      description: "4 stat cards displayed below hero",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              description: 'e.g., "AI-Powered"',
            },
            {
              name: "value",
              title: "Value",
              type: "string",
              description: 'e.g., "10x Faster"',
            },
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Lucide icon name (e.g., Cpu, Users, Award, TrendingUp)",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // Services
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      description: "Main service offerings (6 cards)",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "id",
              title: "Service ID",
              type: "string",
              description: "Unique identifier (e.g., platform, custom, immersive)",
            },
            {
              name: "title",
              title: "Service Title",
              type: "string",
            },
            {
              name: "subtitle",
              title: "Service Subtitle",
              type: "string",
            },
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Lucide icon name",
            },
            {
              name: "thumbnail",
              title: "Service Thumbnail",
              type: "image",
              description: "Optional: Visual representation of service (600x400px)",
            },
            {
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
              description: "List of 5 key features",
              validation: (Rule) => Rule.max(5),
            },
            {
              name: "price",
              title: "Price",
              type: "string",
              description: 'e.g., "From $8,000/month"',
            },
            {
              name: "details",
              title: "Details",
              type: "string",
              description: "Short description of pricing/service model",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // Platform Features
    defineField({
      name: "platformFeatures",
      title: "Platform Features",
      type: "array",
      description: "Deep dive into platform capabilities (4 features)",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Lucide icon name",
            },
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
              name: "image",
              title: "Feature Image",
              type: "image",
              description: "Optional: Screenshot or illustration (800x600px)",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // Platform Demo
    defineField({
      name: "platformDemo",
      title: "Platform Demo",
      type: "object",
      fields: [
        {
          name: "video",
          title: "Demo Video",
          type: "file",
          description: "Platform demo video (MP4, max 100MB, 1920x1080px, 2-5 minutes)",
          options: {
            accept: "video/mp4",
          },
        },
        {
          name: "thumbnail",
          title: "Video Thumbnail",
          type: "image",
          description: "Thumbnail for video player (1920x1080px)",
        },
        {
          name: "title",
          title: "Demo Title",
          type: "string",
        },
        {
          name: "description",
          title: "Demo Description",
          type: "string",
        },
      ],
    }),

    // Platform Stats
    defineField({
      name: "platformStats",
      title: "Platform Stats",
      type: "array",
      description: "3 quick stats below demo video",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
            },
            {
              name: "value",
              title: "Value",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // Pricing Tiers
    defineField({
      name: "pricingTiers",
      title: "Pricing Tiers",
      type: "array",
      description: "3 pricing tiers (Starter, Managed, Enterprise)",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Tier Name",
              type: "string",
            },
            {
              name: "price",
              title: "Price",
              type: "string",
            },
            {
              name: "period",
              title: "Period",
              type: "string",
              description: 'e.g., "/month" or "pricing"',
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
            {
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "ctaText",
              title: "CTA Button Text",
              type: "string",
            },
            {
              name: "popular",
              title: "Mark as Popular",
              type: "boolean",
              description: "Highlight this tier as most popular",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // Process Timeline
    defineField({
      name: "processTimeline",
      title: "Process Timeline",
      type: "array",
      description: "5-step implementation process",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "step",
              title: "Step Number",
              type: "string",
              description: 'e.g., "01", "02"',
            },
            {
              name: "title",
              title: "Phase Title",
              type: "string",
            },
            {
              name: "description",
              title: "Phase Description",
              type: "text",
            },
            {
              name: "duration",
              title: "Duration",
              type: "string",
              description: 'e.g., "Week 1", "Weeks 3-6"',
            },
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Lucide icon name",
            },
            {
              name: "image",
              title: "Phase Image",
              type: "image",
              description: "Optional: Screenshot or illustration for this phase (800x600px)",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(5),
    }),

    // CTA Section
    defineField({
      name: "ctaSection",
      title: "CTA Section",
      type: "object",
      fields: [
        {
          name: "badge",
          title: "Badge Text",
          type: "string",
          description: 'e.g., "LIMITED TIME OFFER"',
        },
        {
          name: "headline",
          title: "Headline",
          type: "string",
        },
        {
          name: "subheadline",
          title: "Subheadline",
          type: "text",
        },
        {
          name: "primaryCtaText",
          title: "Primary CTA Text",
          type: "string",
        },
        {
          name: "primaryCtaLink",
          title: "Primary CTA Link",
          type: "string",
        },
        {
          name: "secondaryCtaText",
          title: "Secondary CTA Text",
          type: "string",
        },
        {
          name: "secondaryCtaLink",
          title: "Secondary CTA Link",
          type: "string",
        },
        {
          name: "trustBadges",
          title: "Trust Badges",
          type: "array",
          description: "3 trust indicators (e.g., SOC 2, Industry Leader, 24/7 Support)",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Icon Name",
                  type: "string",
                },
                {
                  name: "text",
                  title: "Badge Text",
                  type: "string",
                },
              ],
            },
          ],
          validation: (Rule) => Rule.max(3),
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Services Page",
        subtitle: "Service offerings and pricing",
      }
    },
  },
})
