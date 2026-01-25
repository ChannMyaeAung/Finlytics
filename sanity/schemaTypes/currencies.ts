import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'currencies',
  title: 'Currencies',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'ContentOrder',
      title: 'Content Order',
      type: 'number',
      description: 'Order of the content on the currencies page (lower numbers appear first)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Image',
      title: 'Header Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'SecondaryImage',
      title: 'Secondary Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'links',
      title: 'Action Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'string'}),
          ],
        }),
      ],
    }),
  ],
})
