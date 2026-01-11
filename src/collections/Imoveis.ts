import type { CollectionConfig } from 'payload'

export const Imoveis: CollectionConfig = {
  slug: 'imoveis',
  labels: {
    singular: 'Imóvel',
    plural: 'Imóveis',
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'tipo', 'preco', 'status', 'bairro'],
    group: 'Catálogo',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // Informações Básicas
    {
      name: 'titulo',
      type: 'text',
      required: true,
      label: 'Título do Anúncio',
      admin: {
        description: 'Ex: Casa com 3 quartos no Centro',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Amigável',
      admin: {
        description: 'Gerado automaticamente a partir do título',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.titulo) {
              return data.titulo
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
      name: 'tipo',
      type: 'select',
      required: true,
      label: 'Tipo de Imóvel',
      options: [
        { label: 'Casa', value: 'casa' },
        { label: 'Apartamento', value: 'apartamento' },
        { label: 'Kitnet/Studio', value: 'kitnet' },
        { label: 'Sobrado', value: 'sobrado' },
        { label: 'Cobertura', value: 'cobertura' },
        { label: 'Terreno', value: 'terreno' },
        { label: 'Comercial/Sala', value: 'comercial' },
        { label: 'Galpão', value: 'galpao' },
        { label: 'Chácara/Sítio', value: 'chacara' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'finalidade',
      type: 'select',
      required: true,
      label: 'Finalidade',
      options: [
        { label: 'Aluguel', value: 'aluguel' },
        { label: 'Venda', value: 'venda' },
        { label: 'Aluguel ou Venda', value: 'ambos' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Status',
      defaultValue: 'disponivel',
      options: [
        { label: '✅ Disponível', value: 'disponivel' },
        { label: '🔒 Alugado', value: 'alugado' },
        { label: '💰 Vendido', value: 'vendido' },
        { label: '⏸️ Indisponível', value: 'indisponivel' },
        { label: '📝 Rascunho', value: 'rascunho' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'descricao',
      type: 'textarea',
      required: true,
      label: 'Descrição',
      admin: {
        description: 'Descreva os principais atrativos do imóvel',
        rows: 6,
      },
    },

    // Valores
    {
      type: 'row',
      fields: [
        {
          name: 'preco',
          type: 'number',
          required: true,
          label: 'Preço (R$)',
          admin: {
            description: 'Valor do aluguel ou venda',
            step: 100,
          },
        },
        {
          name: 'condominio',
          type: 'number',
          label: 'Condomínio (R$)',
          admin: {
            description: 'Deixe vazio se não houver',
            step: 50,
          },
        },
        {
          name: 'iptu',
          type: 'number',
          label: 'IPTU (R$/mês)',
          admin: {
            description: 'Valor mensal aproximado',
            step: 10,
          },
        },
      ],
    },

    // Características
    {
      type: 'collapsible',
      label: '🏠 Características do Imóvel',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'quartos',
              type: 'number',
              label: 'Quartos',
              defaultValue: 0,
              min: 0,
              max: 20,
            },
            {
              name: 'suites',
              type: 'number',
              label: 'Suítes',
              defaultValue: 0,
              min: 0,
              max: 10,
            },
            {
              name: 'banheiros',
              type: 'number',
              label: 'Banheiros',
              defaultValue: 0,
              min: 0,
              max: 10,
            },
            {
              name: 'vagas',
              type: 'number',
              label: 'Vagas Garagem',
              defaultValue: 0,
              min: 0,
              max: 10,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'area',
              type: 'number',
              label: 'Área Total (m²)',
              admin: {
                step: 1,
              },
            },
            {
              name: 'areaConstruida',
              type: 'number',
              label: 'Área Construída (m²)',
              admin: {
                step: 1,
              },
            },
          ],
        },
        {
          name: 'caracteristicas',
          type: 'select',
          label: 'Características',
          hasMany: true,
          options: [
            { label: 'Mobiliado', value: 'mobiliado' },
            { label: 'Semi-mobiliado', value: 'semi-mobiliado' },
            { label: 'Ar condicionado', value: 'ar-condicionado' },
            { label: 'Piscina', value: 'piscina' },
            { label: 'Churrasqueira', value: 'churrasqueira' },
            { label: 'Quintal', value: 'quintal' },
            { label: 'Varanda', value: 'varanda' },
            { label: 'Sacada', value: 'sacada' },
            { label: 'Elevador', value: 'elevador' },
            { label: 'Portaria 24h', value: 'portaria' },
            { label: 'Academia', value: 'academia' },
            { label: 'Salão de festas', value: 'salao-festas' },
            { label: 'Playground', value: 'playground' },
            { label: 'Pet friendly', value: 'pet-friendly' },
            { label: 'Aceita financiamento', value: 'financiamento' },
          ],
          admin: {
            description: 'Selecione todas que se aplicam',
          },
        },
      ],
    },

    // Localização
    {
      type: 'collapsible',
      label: '📍 Localização',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'endereco',
          type: 'text',
          label: 'Endereço',
          admin: {
            description: 'Rua, número (opcional por privacidade)',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'bairro',
              type: 'relationship',
              relationTo: 'bairros',
              required: true,
              label: 'Bairro',
              admin: {
                description: 'Selecione o bairro',
              },
            },
            {
              name: 'cep',
              type: 'text',
              label: 'CEP',
              admin: {
                placeholder: '79000-000',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'latitude',
              type: 'number',
              label: 'Latitude',
              admin: {
                description: 'Para mapa (opcional)',
                step: 0.000001,
              },
            },
            {
              name: 'longitude',
              type: 'number',
              label: 'Longitude',
              admin: {
                description: 'Para mapa (opcional)',
                step: 0.000001,
              },
            },
          ],
        },
      ],
    },

    // DESTAQUE (só uma vez, aqui)
    {
      name: 'destaque',
      type: 'checkbox',
      label: 'Imóvel em Destaque',
      defaultValue: false,
      admin: {
        description: 'Marque para exibir na página inicial',
        position: 'sidebar',
      },
    },

    // Fotos
    {
      name: 'fotos',
      type: 'array',
      label: 'Fotos do Imóvel',
      required: true,
      minRows: 1,
      maxRows: 30,
      admin: {
        description: 'Adicione fotos do imóvel (primeira será a capa)',
      },
      fields: [
        {
          name: 'imagem',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagem',
        },
        {
          name: 'legenda',
          type: 'text',
          label: 'Legenda',
          admin: {
            description: 'Ex: Sala de estar, Cozinha, Quarto principal',
          },
        },
        {
          name: 'destaque',
          type: 'checkbox',
          label: 'Foto de Capa',
          defaultValue: false,
        },
      ],
    },

    // Informações de Contato
    {
      type: 'collapsible',
      label: '📞 Informações de Contato',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'corretor',
          type: 'text',
          label: 'Nome do Corretor',
          admin: {
            description: 'Deixe vazio para usar o padrão',
          },
        },
        {
          name: 'telefone',
          type: 'text',
          label: 'Telefone/WhatsApp',
          admin: {
            description: 'Ex: (67) 99999-9999',
          },
        },
        {
          name: 'email',
          type: 'email',
          label: 'E-mail para Contato',
        },
      ],
    },

    // SEO e Metadata
    {
      type: 'collapsible',
      label: '🔍 SEO',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description: 'Título para Google (deixe vazio para usar o título)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'Descrição para Google (156 caracteres)',
            rows: 3,
          },
        },
        {
          name: 'visualizacoes',
          type: 'number',
          label: 'Visualizações',
          defaultValue: 0,
          admin: {
            description: 'Contador automático de visualizações',
            readOnly: true,
          },
        },
      ],
    },
  ],
  timestamps: true,
}
