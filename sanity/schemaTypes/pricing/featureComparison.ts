import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'featureComparison',
  title: 'Feature Comparison',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Features',
    }),

    defineField({
      name: 'plans',
      title: 'Plans',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'key',
              title: 'Plan Key',
              type: 'string',
              description: 'free | pro | medici (used in code)',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.length(3),
    }),

    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'availability',
              title: 'Availability by Plan',
              type: 'object',
              fields: [
                defineField({
                  name: 'free',
                  title: 'Free',
                  type: 'featureAvailability',
                }),
                defineField({
                  name: 'pro',
                  title: 'Pro',
                  type: 'featureAvailability',
                }),
                defineField({
                  name: 'medici',
                  title: 'Medici',
                  type: 'featureAvailability',
                }),
              ],
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})
