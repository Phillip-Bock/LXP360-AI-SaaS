export default {
  name: 'imageAsset',
  title: 'Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Image File',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'altText',
      title: 'Alt Text (for accessibility)',
      type: 'string'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}]
    }
  ]
}