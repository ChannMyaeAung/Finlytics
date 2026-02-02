import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'pricing',
  title: 'Pricing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short explanation under the headline',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
    }),
    /* Plans */
    defineField({
      name: 'plans',
      title: 'Plans',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Plan Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Plan Description',
              type: 'text',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
            defineField({
              name: 'highlighted',
              title: 'Highlighted / Recommended',
              type: 'boolean',
              description: 'Adds checkmark + green border',
              initialValue: false,
            }),
          ],
        }),
      ],
    }),

    /* BillingPeriods */
    defineField({
      name: 'billingPeriod',
      title: 'Billing Period',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "1 month", "12 months"',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'pricePerMonth',
              title: 'Price per Month',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
            }),

            defineField({
              name: 'billingNote',
              title: 'Billing Note',
              type: 'string',
              description: 'e.g. "Billed $39.99 every 12 months"',
            }),

            defineField({
              name: 'savingsText',
              title: 'Savings Text',
              type: 'string',
              description: 'e.g. "SAVE 33%"',
            }),

            defineField({
              name: 'highlighted',
              title: 'Highlighted',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        }),
      ],
    }),

    /* Feature Comparison */
    defineField({
      name: 'featureComparison',
      title: 'Feature Comparison',
      type: 'featureComparison',
    }),
  ],
})
