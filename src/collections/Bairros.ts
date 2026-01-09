import type { CollectionConfig } from 'payload'

export const Bairros: CollectionConfig = {
  slug: 'bairros',
  labels: {
    singular: 'Bairro',
    plural: 'Bairros',
  },
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'regiao', 'destaque'],
    group: 'Localização',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      required: true,
      unique: true,
      label: 'Nome do Bairro',
      admin: {
        description: 'Ex: Centro, Jardim dos Estados, Nova Lima',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Amigável',
      admin: {
        description: 'Gerado automaticamente',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.nome) {
              return data.nome
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'regiao',
      type: 'select',
      required: true,
      label: 'Região de Campo Grande',
      options: [
        { label: 'Centro', value: 'centro' },
        { label: 'Região Norte', value: 'norte' },
        { label: 'Região Sul', value: 'sul' },
        { label: 'Região Leste', value: 'leste' },
        { label: 'Região Oeste', value: 'oeste' },
        { label: 'Região do Anhanduizinho', value: 'anhanduizinho' },
        { label: 'Região do Bandeira', value: 'bandeira' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'descricao',
      type: 'textarea',
      label: 'Descrição do Bairro',
      admin: {
        description: 'Informações sobre o bairro, pontos de interesse, etc.',
        rows: 4,
      },
    },
    {
      name: 'destaque',
      type: 'checkbox',
      label: 'Bairro em Destaque',
      defaultValue: false,
      admin: {
        description: 'Mostrar este bairro em destaque no site',
        position: 'sidebar',
      },
    },
    {
      name: 'imagem',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem do Bairro',
      admin: {
        description: 'Foto representativa do bairro (opcional)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          label: 'Latitude',
          admin: {
            description: 'Centro geográfico do bairro',
            step: 0.000001,
          },
        },
        {
          name: 'longitude',
          type: 'number',
          label: 'Longitude',
          admin: {
            step: 0.000001,
          },
        },
      ],
    },
    {
      name: 'ordem',
      type: 'number',
      label: 'Ordem de Exibição',
      defaultValue: 0,
      admin: {
        description: 'Menor número aparece primeiro',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
