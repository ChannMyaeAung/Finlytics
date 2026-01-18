import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bankConnection',
  title: 'Bank Connection',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Bank name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'popularOrder',
      title: 'Popular Order',
      type: 'number',
      description: 'Order for displaying popular banks (lower numbers appear first)',
    }),
    defineField({
      name: 'listOrder',
      title: 'List Order',
      type: 'number',
      description: 'Order for displaying all banks (lower numbers appear first)',
    }),
    defineField({
      name: 'isPopular',
      title: 'Popular bank',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
