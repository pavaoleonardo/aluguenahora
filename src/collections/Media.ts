import type { CollectionConfig } from 'payload'
import cloudinary from '../lib/cloudinary'

export const Media: CollectionConfig = {
  slug: 'media',

  upload: {
    // Do NOT rely on local storage in Vercel
    disableLocalStorage: true,
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
        if (operation !== 'create') return doc

        const file = req.file

        if (!file?.buffer) {
          console.error('❌ No file buffer found')
          return doc
        }

        try {
          console.log('🔥 Uploading to Cloudinary (Vercel-safe)...')

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

            stream.end(file.buffer)
          })

          console.log('✅ Cloudinary URL:', uploadResult.secure_url)

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
