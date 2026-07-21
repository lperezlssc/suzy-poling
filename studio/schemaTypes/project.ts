import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'skills',
      title: 'Skills Used',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Project Details',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
    }),
    defineField({
      name: 'date',
      title: 'Project Date',
      type: 'datetime',
    }),
  ],
})
