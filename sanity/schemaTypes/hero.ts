import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroPage',
  title: 'Hero Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // HERO INTRO
    defineField({
      name: 'heroIntro',
      title: 'Hero Intro',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [{title: 'H1', value: 'h1'}],
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'},
                ],
              },
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
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
          name: 'ctaLabel',
          title: 'CTA Label',
          type: 'string',
        }),
        defineField({
          name: 'ctaUrl',
          title: 'CTA URL',
          type: 'url',
        }),
        defineField({
          name: 'ipadImage',
          title: 'iPad Image',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'phoneImage',
          title: 'Phone Image',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),

    // DATA ENTRY SECTION
    defineField({
      name: 'dataEntry',
      title: 'Data Entry Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'title', title: 'Title', type: 'string'}),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'linkLabel',
                  title: 'Link Label',
                  type: 'string',
                }),
                defineField({name: 'linkUrl', title: 'Link URL', type: 'url'}),
              ],
            }),
          ],
        }),
      ],
    }),

    // APPS ACCESS SECTION
    defineField({
      name: 'appsAccess',
      title: 'Apps Access Section',
      type: 'object',
      fields: [
        defineField({
          name: 'mobileTitle',
          title: 'Mobile Apps Title',
          type: 'string',
        }),
        defineField({
          name: 'mobileBadges',
          title: 'Mobile Badges',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'store',
                  title: 'Store',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Apple', value: 'apple'},
                      {title: 'Google', value: 'google'},
                    ],
                  },
                }),
                defineField({
                  name: 'badgeIcon',
                  title: 'Badge Icon',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'labelImage',
                  title: 'Label Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({name: 'url', title: 'URL', type: 'url'}),
                defineField({
                  name: 'caption',
                  title: 'Caption Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'mobileDirectLink',
          title: 'Mobile Direct Link',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
        }),
        defineField({
          name: 'webTitle',
          title: 'Web App Title',
          type: 'string',
        }),
        defineField({
          name: 'webButtons',
          title: 'Web Buttons',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'provider',
                  title: 'Provider',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Apple', value: 'apple'},
                      {title: 'Google', value: 'google'},
                      {title: 'Facebook', value: 'facebook'},
                    ],
                  },
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({name: 'url', title: 'URL', type: 'url'}),
              ],
            }),
          ],
        }),
        defineField({
          name: 'webSignupLink',
          title: 'Signup Link',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
        }),
      ],
    }),

    // MONEY FLOWS SECTION
    defineField({
      name: 'moneyFlows',
      title: 'Money Flows',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'tabs',
          title: 'Tabs',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'id', title: 'ID', type: 'string'}),
                defineField({name: 'label', title: 'Label', type: 'string'}),
                defineField({
                  name: 'phoneImage',
                  title: 'Phone Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'tabletImage',
                  title: 'Tablet Image',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                }),
                defineField({
                  name: 'ctaLabel',
                  title: 'CTA Label',
                  type: 'string',
                }),
                defineField({name: 'ctaUrl', title: 'CTA URL', type: 'url'}),
              ],
            }),
          ],
        }),
      ],
    }),

    // TESTIMONIALS SECTION
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [{title: 'H2', value: 'h2'}],
            }),
          ],
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'direction',
                  title: 'Direction',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Left to Right', value: 'right'},
                      {title: 'Right to Left', value: 'left'},
                    ],
                  },
                }),
                defineField({
                  name: 'items',
                  title: 'Testimonials',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'name',
                          title: 'Name',
                          type: 'string',
                        }),
                        defineField({
                          name: 'date',
                          title: 'Date',
                          type: 'string',
                        }),
                        defineField({
                          name: 'source',
                          title: 'Source',
                          type: 'string',
                        }),
                        defineField({
                          name: 'avatar',
                          title: 'Avatar',
                          type: 'image',
                          options: {hotspot: true},
                        }),
                        defineField({
                          name: 'text',
                          title: 'Text',
                          type: 'text',
                        }),
                        defineField({
                          name: 'stars',
                          title: 'Stars',
                          type: 'number',
                          validation: (Rule) => Rule.min(1).max(5).integer(),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
