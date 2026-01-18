import {defineType, defineArrayMember, defineField} from 'sanity'

export default defineType({
  name: 'bankConnectionContents',
  title: 'Bank Connection Contents',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
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
                    annotations: [
                      {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            title: 'URL',
                            name: 'href',
                            type: 'url',
                          },
                        ],
                      },
                    ],
                  },
                }),
              ],
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
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
