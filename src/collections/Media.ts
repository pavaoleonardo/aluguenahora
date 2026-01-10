import type { CollectionConfig } from 'payload'
import cloudinary from '../lib/cloudinary'

export const Media: CollectionConfig = {
  slug: 'media',

  upload: {
    staticDir: 'media',
    staticURL: '/media',
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
        readOnly: true,
      },
    },
  ],

  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Only run on create, not on every update
        if (operation !== 'create') return doc

        // In Payload v3, the uploaded file is here:
        const file = req.file

        if (!file) {
          console.error('❌ No file found in request')
          return doc
        }

        try {
          console.log('🔥 Uploading to Cloudinary...')

          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'aluguenahora',
            public_id: `media-${doc.id}`,
          })

          console.log('✅ Cloudinary URL:', result.secure_url)

          // Update document with Cloudinary URL
          await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: {
              cloudinaryUrl: result.secure_url,
            },
          })
        } catch (error) {
          console.error('❌ Cloudinary upload failed:', error)
        }

        return doc
      },
    ],
  },
}
