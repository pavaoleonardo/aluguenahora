import type { Core } from '@strapi/strapi';
import axios from 'axios';
import sharp from 'sharp';

// Optimize sharp for low memory environments
sharp.concurrency(1);
sharp.cache(false);

type BootstrapContext = { strapi: Core.Strapi };
type RegistrationState = {
  telefone?: string;
  celular?: string;
  creci?: string;
  nome_imobiliaria?: string;
  nome_completo?: string;
  tipo_usuario?: string;
};

type BootstrapNewsItem = {
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  data: string;
};

const geocodeAddress = async (
  endereco: string,
  bairro: unknown,
  cidade: string
): Promise<{ latitude: number; longitude: number } | null> => {
  if (!endereco || !endereco.trim()) {
    return null;
  }

  const bairroStr =
    typeof bairro === 'object' && bairro !== null && 'bairro' in bairro
      ? String((bairro as { bairro?: string }).bairro ?? '')
      : typeof bairro === 'string'
        ? bairro
        : '';
  const cidadeStr = cidade || 'Campo Grande';

  const addressVariations = [
    `${endereco}, ${bairroStr}, ${cidadeStr}, MS, Brasil`,
    `${endereco}, ${cidadeStr}, MS, Brasil`,
    `${endereco}, ${cidadeStr}, Brasil`,
  ].filter((variation) => variation.length > 0);

  for (const fullAddress of addressVariations) {
    try {
      console.log(`[Geocoding] Attempting: ${fullAddress}`);

      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          format: 'json',
          q: fullAddress,
          limit: 1,
        },
        headers: {
          'User-Agent': 'AlugueNaHora-App/1.0 (pavaoleonardo@gmail.com)',
        },
        timeout: 10000,
      });

      const data = response.data;

      if (data && data.length > 0) {
        console.log(`[Geocoding] Success: lat=${data[0].lat}, lon=${data[0].lon}`);
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      }
    } catch (error: any) {
      console.error(`[Geocoding] Error with variation "${fullAddress}": ${error.message}`);
    }
  }

  return null;
};

const applyRegistrationFields = (data: Record<string, unknown>, custom?: RegistrationState) => {
  if (!custom) {
    return;
  }

  if (custom.telefone) data.telefone = custom.telefone;
  if (custom.celular) data.celular = custom.celular;
  if (custom.creci) data.creci = custom.creci;
  if (custom.nome_imobiliaria) data.nome_imobiliaria = custom.nome_imobiliaria;
  if (custom.nome_completo) data.nome_completo = custom.nome_completo;
  if (custom.tipo_usuario) data.tipo_usuario = custom.tipo_usuario;
};

export default {
  async register({ strapi }: BootstrapContext) {
    strapi.customFields.register({
      name: 'bairro-regiao',
      type: 'json',
    });
    void geocodeAddress;
  },

  bootstrap({ strapi }: BootstrapContext) {
    // 0. Koa Middleware: Strip custom registration fields BEFORE Strapi's Yup validation
    //    This runs before the router, so the body is clean when Yup validates it.
    //    The custom fields are stashed on ctx.state.customRegistration for the
    //    beforeCreate lifecycle hook to pick up and write to the database.
    const CUSTOM_FIELDS = ['telefone', 'celular', 'creci', 'nome_imobiliaria', 'nome_completo', 'tipo_usuario'];

    strapi.server.use(async (ctx: any, next: () => Promise<void>) => {
      if (
        ctx.request.method === 'POST' &&
        ctx.request.url?.includes('/api/auth/local/register') &&
        ctx.request.body
      ) {
        const stashed: Record<string, unknown> = {};
        for (const field of CUSTOM_FIELDS) {
          if (ctx.request.body[field] !== undefined) {
            stashed[field] = ctx.request.body[field];
            delete ctx.request.body[field];
          }
        }
        // Also strip 'role' to prevent privilege escalation
        delete ctx.request.body.role;

        ctx.state.customRegistration = stashed;
        console.log('🔧 [Middleware] Stripped custom registration fields:', Object.keys(stashed));
      }
      await next();
    });

    // 1. Configure Plugin Settings (Safe Mode)
    void (async () => {
      try {
        const pluginStore = strapi.store({
          environment: '',
          type: 'plugin',
          name: 'users-permissions',
        });

        // Email Templates
        try {
          const templateSettings = (await pluginStore.get({ key: 'email' })) as any;
          if (templateSettings?.email_confirmation) {
            templateSettings.email_confirmation.options.from.email = 'noreply@mail.aluguenahora.com.br';
            templateSettings.email_confirmation.options.from.name = 'Alugue na Hora';
            templateSettings.email_confirmation.options.response_email = 'noreply@mail.aluguenahora.com.br';

            templateSettings.reset_password.options.from.email = 'noreply@mail.aluguenahora.com.br';
            templateSettings.reset_password.options.from.name = 'Alugue na Hora';
            templateSettings.reset_password.options.response_email = 'noreply@mail.aluguenahora.com.br';

            await pluginStore.set({ key: 'email', value: templateSettings });
            console.log('✅ [Bootstrap] Email templates re-aligned.');
          }
        } catch (e: any) {
          console.warn('[Bootstrap] Could not update email templates:', e.message);
        }

        // Advanced Settings
        try {
          const advancedSettings = (await pluginStore.get({ key: 'advanced' })) as any;
          if (advancedSettings) {
            advancedSettings.email_confirmation_redirection = 'https://aluguenahora.com.br/login?confirmed=true';
            await pluginStore.set({ key: 'advanced', value: advancedSettings });
            console.log('✅ [Bootstrap] Advanced settings re-aligned.');
          }
        } catch (e: any) {
          console.warn('[Bootstrap] Could not update advanced settings:', e.message);
        }

        // Public Permissions
        try {
          const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
            where: { type: 'public' },
          });

          if (publicRole) {
            const actions = [
              'api::imovel.imovel.find',
              'api::imovel.imovel.findOne',
              'api::noticia.noticia.find',
              'api::noticia.noticia.findOne'
            ];
            
            for (const action of actions) {
              await strapi.db.query('plugin::users-permissions.permission').updateMany({
                where: {
                  role: publicRole.id,
                  action: action,
                },
                data: { enabled: true },
              });
            }
            console.log('✅ [Bootstrap] Public permissions unified.');
          }
        } catch (e: any) {
          console.warn('[Bootstrap] Could not update public permissions:', e.message);
        }
      } catch (err: any) {
        console.warn('[Bootstrap] Plugin configuration error:', err.message);
      }
    })();

    // 2. Lifecycle Hooks
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user'],
      async beforeCreate(event) {
        const { data } = event.params as { data: Record<string, unknown> };
        const ctx = strapi.requestContext.get() as any;
        applyRegistrationFields(data, ctx?.state?.customRegistration || ctx?.request?.body);
      },
      async beforeUpdate(event) {
        const { data } = event.params as { data: Record<string, unknown> };
        const ctx = strapi.requestContext.get() as any;
        applyRegistrationFields(data, ctx?.request?.body);
      },
    });

    // 3. Database Schema Integrity (Safe Mode & Non-Destructive)
    void (async () => {
      try {
        if (!strapi.db || !strapi.db.connection) return;

        console.log('🔍 [Bootstrap] Verifying database integrity...');
        const hasTable = await strapi.db.connection.schema.hasTable('up_users');

        if (hasTable) {
          // Add missing columns only
          const customFields = ['telefone', 'celular', 'creci', 'nome_imobiliaria', 'nome_completo', 'tipo_usuario', 'locale', 'role'];
          for (const fieldName of customFields) {
            const hasCol = await strapi.db.connection.schema.hasColumn('up_users', fieldName);
            if (!hasCol) {
              await strapi.db.connection.schema.alterTable('up_users', (table: any) => {
                if (fieldName === 'role') table.integer('role');
                else table.string(fieldName, 255);
              });
              console.log(`[Bootstrap] Added missing column "${fieldName}" to up_users.`);
            }
          }

          // Heal Users Metadata (Document ID / Locale)
          const usersMissingDocs = await strapi.db.connection('up_users')
            .whereNull('document_id')
            .orWhereNull('locale')
            .limit(100);

          if (usersMissingDocs.length > 0) {
            console.log(`🚨 [Bootstrap] Healing ${usersMissingDocs.length} users...`);
            for (const user of usersMissingDocs) {
              try {
                // Determine if we should use ID or some fallback for document_id
                const docId = user.document_id || require('crypto').randomBytes(12).toString('hex');
                await strapi.db.connection('up_users')
                  .where({ id: user.id })
                  .update({
                    document_id: docId,
                    locale: user.locale || 'pt-BR'
                  });
              } catch (e: any) {
                console.warn(`[Bootstrap] User heal failed (${user.id}):`, e.message);
              }
            }
          }

          // Heal Imoveis Metadata
          const imoveisMissingDocs = await strapi.db.connection('imoveis')
            .whereNull('document_id')
            .orWhereNotNull('locale')
            .limit(100);

          if (imoveisMissingDocs.length > 0) {
            console.log(`🚨 [Bootstrap] Healing ${imoveisMissingDocs.length} properties...`);
            for (const item of imoveisMissingDocs) {
              try {
                await strapi.db.connection('imoveis')
                  .where({ id: item.id })
                  .update({
                    document_id: item.document_id || require('crypto').randomBytes(12).toString('hex'),
                    locale: null,
                    published_at: item.published_at || new Date().toISOString(),
                  });
              } catch (e: any) {
                console.warn(`[Bootstrap] Property heal failed (${item.id}):`, e.message);
              }
            }
          }
        } else {
          console.warn('🚨 [Bootstrap] up_users table is missing! This is a critical error.');
          // We DO NOT recreate the table here anymore, as it's too dangerous.
          // The administrator must investigate why the table is missing.
        }
      } catch (err: any) {
        console.warn('[Bootstrap] Database integrity check failed:', err.message);
      }
    })();

    // 4. Seeding News (Safe Mode)
    void (async () => {
      try {
        const newsCount = await strapi.db.query('api::noticia.noticia').count();
        if (newsCount === 0) {
          console.log('🌱 [Bootstrap] Seeding initial news...');
          const newsToSeed: BootstrapNewsItem[] = [
            {
              titulo: 'Bairro São Francisco lidera valorização imobiliária em Campo Grande com alta de 35%',
              resumo: 'Com infraestrutura consolidada e localização privilegiada...',
              conteudo: 'O mercado imobiliário de Campo Grande vive um momento de forte valorização...',
              categoria: 'Valorização',
              data: '2026-02-10',
            },
            {
              titulo: 'Alta demanda: Estoque de imóveis em Campo Grande pode se esgotar em apenas 4 meses',
              resumo: 'O aquecimento do mercado imobiliário na Capital atinge níveis recordes...',
              conteudo: 'A velocidade de vendas em Campo Grande atingiu patamares nunca antes vistos...',
              categoria: 'Investimento',
              data: '2026-02-08',
            },
            {
              titulo: 'Agronegócio e infraestrutura impulsionam recorde de investimentos imobiliários em MS',
              resumo: 'O setor imobiliário do estado vive um momento de forte expansão...',
              conteudo: 'Mato Grosso do Sul consolidou sua posição como um dos estados mais dinâmicos...',
              categoria: 'Alta Demanda',
              data: '2026-02-05',
            },
          ];

          for (const item of newsToSeed) {
            await (strapi as any).documents('api::noticia.noticia').create({
              data: item,
              status: 'published',
            });
          }
          console.log('✅ [Bootstrap] News seeded.');
        }
      } catch (e: any) {
        console.warn('[Bootstrap] News seeding failed:', e.message);
      }
    })();
  },
};
