import type { CollectionConfig } from 'payload'
import cloudinary from '../lib/cloudinary'

export const Media: CollectionConfig = {
  slug: 'media',

  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },

  upload: {
    disableLocalStorage: true, // required for Vercel
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
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
        if (operation !== 'create') return doc

        const file = req.file

        if (!file?.data) {
          console.error('❌ No file data found')
          return doc
        }

        try {
          console.log('🔥 Uploading to Cloudinary...')

          const uploadResult = await new Promise<any>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: 'aluguenahora',
                public_id: `media-${doc.id}`,
              },
              (error, result) => {
                if (error) reject(error)
                else resolve(result)
              },
            )

            stream.end(file.data)
          })

          await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: {
              cloudinaryUrl: uploadResult.secure_url,
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
