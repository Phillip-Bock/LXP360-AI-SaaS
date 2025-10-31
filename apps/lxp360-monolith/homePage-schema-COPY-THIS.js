// COPY THIS ENTIRE FILE TO: Sanity-Media/schemas/homePage.js

export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
    },
    {
      name: "heroBackground",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "heroCtaText",
      title: "Hero Button Text",
      type: "string",
    },
    {
      name: "heroCtaLink",
      title: "Hero Button Link",
      type: "string",
    },
    {
      name: "clientLogos",
      title: "Client Logos (Scrolling Banner)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "logo", title: "Logo", type: "image", options: { hotspot: true } },
            { name: "companyName", title: "Company Name", type: "string" },
            { name: "alt", title: "Alt Text", type: "string" },
          ],
        },
      ],
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "image", title: "Image", type: "image" },
            { name: "icon", title: "Icon Name", type: "string" },
          ],
        },
      ],
    },
    {
      name: "platformScreenshots",
      title: "Platform Screenshots",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", title: "Screenshot", type: "image" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    },
    {
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", title: "Quote", type: "text" },
            { name: "authorName", title: "Name", type: "string" },
            { name: "authorTitle", title: "Title", type: "string" },
            { name: "authorPhoto", title: "Photo", type: "image" },
            { name: "companyLogo", title: "Company Logo", type: "image" },
          ],
        },
      ],
    },
  ],
}
