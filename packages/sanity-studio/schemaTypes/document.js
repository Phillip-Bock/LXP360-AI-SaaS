export default {
  name: 'documentAsset',
  title: 'Document',
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
      name: 'file',
      title: 'Document File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt'
      }
    },
    {
      name: 'fileType',
      title: 'File Type',
      type: 'string',
      options: {
        list: [
          {title: 'PDF', value: 'pdf'},
          {title: 'Word Document', value: 'doc'},
          {title: 'Excel Spreadsheet', value: 'xls'},
          {title: 'PowerPoint', value: 'ppt'},
          {title: 'Text File', value: 'txt'},
          {title: 'Other', value: 'other'}
        ]
      }
    }
  ]
}