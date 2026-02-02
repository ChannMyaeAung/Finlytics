import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'featureAvailability',
  title: 'Feature Availability',
  type: 'object',
  fields: [
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Not available', value: 'none'},
          {title: 'Limited', value: 'limited'},
          {title: 'Included', value: 'included'},
          {title: 'Unlimited', value: 'unlimited'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      description: 'e.g. "2 budgets", "up to 4 per expense"',
    }),
  ],
})
