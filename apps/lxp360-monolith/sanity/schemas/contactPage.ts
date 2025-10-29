import { defineType, defineField } from "sanity"

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "badge",
          title: "Badge Text",
          type: "string",
          description: 'e.g., "GET IN TOUCH"',
        },
        {
          name: "headline",
          title: "Headline",
          type: "string",
          description: "Main headline (e.g., 'Let's Build Something Amazing Together')",
        },
        {
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          description: "Supporting text below headline",
        },
        {
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          description: "Hero background image (1920x1080px)",
        },
      ],
    }),

    // Contact Methods
    defineField({
      name: "contactMethods",
      title: "Contact Methods",
      type: "array",
      description: "Different ways to reach out (3-4 cards)",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Method Title",
              type: "string",
              description: 'e.g., "Email Us", "Call Us", "Visit Us"',
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Phosphor icon name (e.g., 'Envelope', 'Phone', 'MapPin')",
            },
            {
              name: "contactInfo",
              title: "Contact Information",
              type: "string",
              description: "Email, phone number, or address",
            },
            {
              name: "link",
              title: "Link",
              type: "string",
              description: "Optional: mailto:, tel:, or maps link",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // Contact Form Configuration
    defineField({
      name: "contactForm",
      title: "Contact Form",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Form Heading",
          type: "string",
          description: 'e.g., "Send Us a Message"',
        },
        {
          name: "description",
          title: "Form Description",
          type: "text",
        },
        {
          name: "submitButtonText",
          title: "Submit Button Text",
          type: "string",
          description: 'e.g., "Send Message"',
        },
        {
          name: "successMessage",
          title: "Success Message",
          type: "text",
          description: "Message shown after successful submission",
        },
        {
          name: "fields",
          title: "Form Fields",
          type: "array",
          description: "Configure which fields to show in the form",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "fieldName",
                  title: "Field Name",
                  type: "string",
                  options: {
                    list: [
                      { title: "Full Name", value: "name" },
                      { title: "Email", value: "email" },
                      { title: "Phone", value: "phone" },
                      { title: "Company", value: "company" },
                      { title: "Subject", value: "subject" },
                      { title: "Message", value: "message" },
                    ],
                  },
                },
                {
                  name: "label",
                  title: "Field Label",
                  type: "string",
                },
                {
                  name: "placeholder",
                  title: "Placeholder Text",
                  type: "string",
                },
                {
                  name: "required",
                  title: "Required Field",
                  type: "boolean",
                  initialValue: false,
                },
              ],
            },
          ],
        },
      ],
    }),

    // Office Locations
    defineField({
      name: "officeLocations",
      title: "Office Locations",
      type: "array",
      description: "Physical office locations",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "city",
              title: "City",
              type: "string",
              description: 'e.g., "San Francisco"',
            },
            {
              name: "address",
              title: "Address",
              type: "text",
            },
            {
              name: "phone",
              title: "Phone Number",
              type: "string",
            },
            {
              name: "email",
              title: "Email",
              type: "string",
            },
            {
              name: "hours",
              title: "Business Hours",
              type: "string",
              description: 'e.g., "Mon-Fri: 9AM-6PM PST"',
            },
            {
              name: "mapLink",
              title: "Google Maps Link",
              type: "url",
            },
            {
              name: "image",
              title: "Office Image",
              type: "image",
              description: "Photo of the office (800x600px)",
            },
          ],
        },
      ],
    }),

    // FAQ Section
    defineField({
      name: "faqSection",
      title: "FAQ Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
          description: 'e.g., "Frequently Asked Questions"',
        },
        {
          name: "faqs",
          title: "FAQs",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "question",
                  title: "Question",
                  type: "string",
                },
                {
                  name: "answer",
                  title: "Answer",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    }),

    // Social Links
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      description: "Social media profiles",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Twitter/X", value: "twitter" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "GitHub", value: "github" },
                ],
              },
            },
            {
              name: "url",
              title: "Profile URL",
              type: "url",
            },
          ],
        },
      ],
    }),

    // Response Time Section
    defineField({
      name: "responseTimeSection",
      title: "Response Time Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
          description: 'e.g., "We\'re Here to Help"',
        },
        {
          name: "stats",
          title: "Response Stats",
          type: "array",
          description: "Key metrics about response times",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "value",
                  title: "Value",
                  type: "string",
                  description: 'e.g., "< 2 hours"',
                },
                {
                  name: "label",
                  title: "Label",
                  type: "string",
                  description: 'e.g., "Average Response Time"',
                },
                {
                  name: "icon",
                  title: "Icon Name",
                  type: "string",
                  description: "Phosphor icon name",
                },
              ],
            },
          ],
          validation: (Rule) => Rule.max(3),
        },
      ],
    }),

    // CTA Section
    defineField({
      name: "ctaSection",
      title: "CTA Section",
      type: "object",
      fields: [
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
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          description: "CTA section background (1920x600px)",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Contact Page",
        subtitle: "Contact form and information",
      }
    },
  },
})
