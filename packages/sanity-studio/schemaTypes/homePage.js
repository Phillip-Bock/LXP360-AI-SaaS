export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // Hero Section
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline for hero section',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'Supporting text under hero title'
    },
    {
  name: 'heroBackground',
  title: 'Hero Background Video/Image',
  type: 'file',  // <-- CHANGED FROM 'image' TO 'file'
  description: 'Background video or image for hero section (max 100MB)',
  options: {
    accept: 'image/*,video/*'
  }
},
    {
      name: 'heroCtaText',
      title: 'Hero CTA Button Text',
      type: 'string',
      initialValue: 'Get Started'
    },
    {
      name: 'heroCtaLink',
      title: 'Hero CTA Button Link',
      type: 'string',
      initialValue: '/auth/signup'
    },
    
    // Client Logos Section
    {
      name: 'clientLogosTitle',
      title: 'Client Logos Section Title',
      type: 'string',
      initialValue: 'Trusted by Industry Leaders'
    },
    {
      name: 'clientLogos',
      title: 'Client/Partner Logos',
      type: 'array',
      description: 'Logos for scrolling banner (6-8 recommended)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'logo',
              title: 'Logo Image',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required()
            },
            {
              name: 'companyName',
              title: 'Company Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Accessibility description'
            }
          ],
          preview: {
            select: {
              title: 'companyName',
              media: 'logo'
            }
          }
        }
      ]
    },
    
    // Features Section
    {
      name: 'featuresTitle',
      title: 'Features Section Title',
      type: 'string',
      initialValue: 'Powerful Features for Modern Learning'
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      validation: Rule => Rule.max(6),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'image',
              title: 'Feature Image/Illustration',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'icon',
              title: 'Icon Name (Phosphor)',
              type: 'string',
              description: 'e.g., Brain, ChartLine, Users, Rocket, Shield, Lightning'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image'
            }
          }
        }
      ]
    },
    
    // Platform Screenshots
    {
      name: 'platformTitle',
      title: 'Platform Section Title',
      type: 'string',
      initialValue: 'See LXP360 in Action'
    },
    {
      name: 'platformScreenshots',
      title: 'Platform Screenshots',
      type: 'array',
      validation: Rule => Rule.max(4),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Screenshot',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required()
            },
            {
              name: 'title',
              title: 'Screenshot Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image'
            }
          }
        }
      ]
    },
    
    // Testimonials
    {
      name: 'testimonialsTitle',
      title: 'Testimonials Section Title',
      type: 'string',
      initialValue: 'What Our Clients Say'
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      validation: Rule => Rule.max(6),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'authorTitle',
              title: 'Author Title',
              type: 'string',
              description: 'e.g., CEO, Training Director'
            },
            {
              name: 'authorPhoto',
              title: 'Author Photo',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'companyName',
              title: 'Company Name',
              type: 'string'
            },
            {
              name: 'companyLogo',
              title: 'Company Logo',
              type: 'image',
              options: { hotspot: true }
            }
          ],
          preview: {
            select: {
              title: 'authorName',
              subtitle: 'companyName',
              media: 'authorPhoto'
            }
          }
        }
      ]
    },
    
    // About/Mission Section
    {
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
      initialValue: 'Training the Future for the Future'
    },
    {
      name: 'aboutDescription',
      title: 'About Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
      options: { hotspot: true }
    },
    
    // CTA Section
    {
      name: 'ctaTitle',
      title: 'CTA Section Title',
      type: 'string',
      initialValue: 'Ready to Transform Your Training?'
    },
    {
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text'
    },
    {
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get Started Today'
    },
    {
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/auth/signup'
    },
    {
      name: 'ctaBackground',
      title: 'CTA Background Image',
      type: 'image',
      options: { hotspot: true }
    }
  ],
  preview: {
    select: {
      title: 'heroTitle'
    },
    prepare(selection) {
      return {
        title: 'Home Page',
        subtitle: selection.title
      }
    }
  }
}