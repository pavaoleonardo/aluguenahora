import type { CollectionConfig } from 'payload'
import cloudinary from '../lib/cloudinary'
import path from 'path'

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
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (doc.filename && !doc.cloudinaryUrl) {
          console.log('🔥 Upload para Cloudinary...')

          try {
            const filePath = path.join(process.cwd(), 'media', doc.filename)

            const result = await cloudinary.uploader.upload(filePath, {
              folder: 'aluguenahora',
              public_id: `media-${doc.id}`,
            })

            console.log('✅ URL:', result.secure_url)

            // Atualizar sem await para não bloquear
            req.payload
              .update({
                collection: 'media',
                id: doc.id,
                data: {
                  cloudinaryUrl: result.secure_url,
                },
              })
              .catch((err) => console.error('Erro ao salvar URL:', err))
          } catch (error) {
            console.error('❌ Erro:', error)
          }
        }

        return doc
      },
    ],
  },
}
