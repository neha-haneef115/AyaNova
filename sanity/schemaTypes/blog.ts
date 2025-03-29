import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'blogNumber',
      title: 'Blog Number',
      type: 'number',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'arabicAyah',
      title: 'Arabic Ayah',
      type: 'text',
    }),
    defineField({
      name: 'translation',
      title: 'Translation',
      type: 'text',
    }),
    defineField({
      name: 'media',
      title: 'Image/Video',
      type: 'array',
      of: [
        { type: 'image' }, 
        { type: 'file' },
        {
          type: 'object',
          fields: [
            {
              name: 'url',
              title: 'YouTube Video URL',
              type: 'url',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'scientificValidation',
      title: 'Scientific Validation',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'reflection',
      title: 'Reflection',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'conclusion',
      title: 'Conclusion',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
