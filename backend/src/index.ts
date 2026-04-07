import type { Core } from '@strapi/strapi';
import axios from 'axios';
import sharp from 'sharp';

// Optimize sharp for low memory environments
sharp.concurrency(1);
sharp.cache(false);

// Geocode function
const geocodeAddress = async (endereco: string, bairro: any, cidade: string): Promise<{ latitude: number; longitude: number } | null> => {
  if (!endereco || !endereco.trim()) return null;
  const bairroStr = typeof bairro === 'object' ? bairro?.bairro : (typeof bairro === 'string' ? bairro : '');
  const cidadeStr = cidade || 'Campo Grande';
  
  const addressVariations = [
    `${endereco}, ${bairroStr}, ${cidadeStr}, MS, Brasil`,
    `${endereco}, ${cidadeStr}, MS, Brasil`,
    `${endereco}, ${cidadeStr}, Brasil`
  ].filter(v => v.length > 0);

  for (const fullAddress of addressVariations) {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { format: 'json', q: fullAddress, limit: 1 },
        headers: { 'User-Agent': 'AlugueNaHora-App/1.0 (pavaoleonardo@gmail.com)' },
        timeout: 10000
      });
      if (response.data && response.data.length > 0) {
        return { latitude: parseFloat(response.data[0].lat), longitude: parseFloat(response.data[0].lon) };
      }
    } catch (error) {}
  }
  return null;
};

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.customFields.register({ name: 'bairro-regiao', type: 'json' });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 1. Configure Plugin Settings (Email & Permissions)
    (async () => {
      try {
        const pluginStore = strapi.store({ environment: '', type: 'plugin', name: 'users-permissions' });
        
        // SMTP / Resend Compatibility Fix
        const templateSettings = await pluginStore.get({ key: 'email' }) as any;
        if (templateSettings?.email_confirmation) {
          templateSettings.email_confirmation.options.from.email = 'noreply@mail.aluguenahora.com.br';
          templateSettings.email_confirmation.options.from.name = 'Alugue na Hora';
          templateSettings.email_confirmation.options.response_email = 'noreply@mail.aluguenahora.com.br';
          await pluginStore.set({ key: 'email', value: templateSettings });
        }

        // Advanced Settings & Emergency Bypass
        const advancedSettings = await pluginStore.get({ key: 'advanced' }) as any;
        if (advancedSettings) {
          advancedSettings.email_confirmation_redirection = 'https://aluguenahora.com.br/login?confirmed=true';
          advancedSettings.email_confirmation = false; // BYPASS to restore registration
          await pluginStore.set({ key: 'advanced', value: advancedSettings });
          console.log('✅ [Bootstrap] Settings updated: SMTP domain aligned & Email confirmation bypassed.');
        }

        // Fix Permissions for Authenticated User
        const authRole = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'authenticated' } });
        if (authRole) {
          const perm = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: { role: authRole.id, action: 'plugin::users-permissions.user.update' }
          });
          if (perm) {
            await strapi.db.query('plugin::users-permissions.permission').update({
              where: { id: perm.id },
              data: { enabled: true }
            });
            console.log('✅ [Bootstrap] Updated permissions for Authenticated role.');
          }
        }
      } catch (err: any) {
        console.warn('[Bootstrap] Plugin config warning:', err.message);
      }
    })();

    // 2. Lifecycle Hooks
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user'],
      async beforeCreate(event) {
        const { data } = event.params;
        const ctx = strapi.requestContext.get() as any;
        const custom = ctx?.state?.customRegistration || ctx?.request?.body;
        if (custom) {
          if (custom.telefone) data.telefone = custom.telefone;
          if (custom.celular) data.celular = custom.celular;
          if (custom.creci) data.creci = custom.creci;
          if (custom.nome_imobiliaria) data.nome_imobiliaria = custom.nome_imobiliaria;
          if (custom.nome_completo) data.nome_completo = custom.nome_completo;
          if (custom.tipo_usuario) data.tipo_usuario = custom.tipo_usuario;
        }
      },
      async beforeUpdate(event) {
        const { data } = event.params;
        const ctx = strapi.requestContext.get() as any;
        const body = ctx?.request?.body;
        if (body) {
          if (body.tipo_usuario) data.tipo_usuario = body.tipo_usuario;
          if (body.nome_completo) data.nome_completo = body.nome_completo;
          if (body.telefone) data.telefone = body.telefone;
          if (body.celular) data.celular = body.celular;
          if (body.creci) data.creci = body.creci;
          if (body.nome_imobiliaria) data.nome_imobiliaria = body.nome_imobiliaria;
        }
      },
    });

    // 3. Database Integrity Healing
    (async () => {
      try {
        const usersToHeal = await strapi.db.connection('up_users').whereNull('document_id').orWhereNull('locale');
        if (usersToHeal.length > 0) {
          for (const u of usersToHeal) {
            try {
              await strapi.documents('plugin::users-permissions.user').update({
                documentId: u.document_id || undefined,
                data: { locale: u.locale || 'pt-BR', confirmed: true },
              });
            } catch (e) {}
          }
          console.log(`✅ [Bootstrap] Healed ${usersToHeal.length} users.`);
        }
      } catch (err: any) {
        console.warn('[Bootstrap] Database healing warning:', err.message);
      }
    })();

    // 4. Seeding logic
    const seedNews = async () => {
      try {
        const news = [
          {
            titulo: 'Bairro São Francisco lidera valorização imobiliária em Campo Grande com alta de 35%',
            resumo: 'Com infraestrutura consolidada e localização privilegiada, o bairro se destaca como o principal polo de valorização na capital sul-mato-grossense em 2025.',
            categoria: 'Valorização', data: '2026-02-10',
          },
          {
            titulo: 'Alta demanda: Estoque de imóveis em Campo Grande pode se esgotar em apenas 4 meses',
            resumo: 'O aquecimento do mercado imobiliário na Capital atinge níveis recordes, impulsionado pela facilidade de crédito e novos lançamentos.',
            categoria: 'Investimento', data: '2026-02-08',
          },
          {
            titulo: 'Agronegócio e infraestrutura impulsionam recorde de investimentos imobiliários em MS',
            resumo: 'O setor imobiliário do estado vive um momento de forte expansão, atraindo investidores de todo o Brasil interessados na solidez econômica regional.',
            categoria: 'Alta Demanda', data: '2026-02-05',
          }
        ];
        for (const item of news) {
          const exists = await strapi.db.query('api::noticia.noticia').findOne({ where: { titulo: item.titulo } });
          if (!exists) {
            await (strapi as any).documents('api::noticia.noticia').create({
              data: { ...item, conteudo: 'Conteúdo de exemplo para a notícia.' },
              status: 'published'
            });
          }
        }
      } catch (e) {}
    };
    seedNews();
  },
};
