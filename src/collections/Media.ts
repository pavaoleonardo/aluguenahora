import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      admin: {
        description: 'URL da imagem no Cloudinary',
        readOnly: true,
      },
    },
  ],
}
