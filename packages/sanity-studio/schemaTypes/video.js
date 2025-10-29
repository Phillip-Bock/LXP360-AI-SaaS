export default {
  name: 'video',
  title: 'Video',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*'
      }
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'duration',
      title: 'Duration (in seconds)',
      type: 'number'
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    }
  ]
}