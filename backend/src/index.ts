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
  cpf?: string;
  cnpj?: string;
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
  if (custom.cpf) data.cpf = custom.cpf;
  if (custom.cnpj) data.cnpj = custom.cnpj;
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
    const CUSTOM_FIELDS = ['telefone', 'celular', 'cpf', 'cnpj', 'creci', 'nome_imobiliaria', 'nome_completo', 'tipo_usuario'];

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

    // 0b. Koa Middleware: /api/auth/forgot-password may only fire for a REGISTERED,
    //     active e-mail. Strapi's stock handler answers { ok: true } for ANY address
    //     (anti enumeration), so an unregistered address got the success screen and
    //     never an e-mail — the owner hit exactly that while recovering his own
    //     account and asked for explicit feedback instead. Running as Koa middleware
    //     keeps it ahead of the route's body validation, so even an empty body gets
    //     our message. Trade-off: this discloses whether an address has an account
    //     (rate limiting this route is a follow-up).
    strapi.server.use(async (ctx: any, next: () => Promise<void>) => {
      if (ctx.request.method !== 'POST' || !ctx.request.url?.includes('/api/auth/forgot-password')) {
        return next();
      }

      const reject = (message: string) => {
        ctx.status = 400;
        ctx.body = {
          data: null,
          error: { status: 400, name: 'ApplicationError', message, details: {} },
        };
      };

      const rawEmail = typeof ctx.request.body?.email === 'string' ? ctx.request.body.email : '';
      const email = rawEmail.trim().toLowerCase();

      if (!email) {
        reject('Informe o e-mail cadastrado para receber o link de recuperação.');
        return;
      }

      const user = (await strapi.db
        .query('plugin::users-permissions.user')
        .findOne({ where: { email } })) as { blocked?: boolean } | null;

      if (!user) {
        reject('Este e-mail não está cadastrado.');
        return;
      }

      if (user.blocked) {
        reject('Esta conta está bloqueada. Fale com o suporte.');
        return;
      }

      // Registered and usable: let Strapi run its own flow, so token generation,
      // the reset_password template and the plugin store stay canonical.
      await next();
    });

    // 0c. Koa Middleware: the SAME explicit feedback for the Strapi ADMIN panel's
    //     "Esqueceu sua senha?" form (api host /admin). Strapi's admin auth answers
    //     204 No Content for ANY address (measured on production 2026-10-02), so the
    //     panel always prints "E-mail enviado" and the owner could not tell whether his
    //     address is an admin account, or whether the reset mail had silently failed.
    //     Trade-off accepted here as well (see 0b): this discloses whether an address
    //     is an admin account. The two message variants matter: typing a SITE e-mail
    //     (up_users) into the panel is the mistake that screen invites, so it is named.
    strapi.server.use(async (ctx: any, next: () => Promise<void>) => {
      if (ctx.request.method !== 'POST' || !ctx.request.url?.includes('/admin/forgot-password')) {
        return next();
      }

      // Fail open if the body never reached us: never break the panel's own flow.
      if (!ctx.request.body || typeof ctx.request.body !== 'object') {
        return next();
      }

      const reply = (status: number, name: string, message: string) => {
        ctx.status = status;
        ctx.body = { data: null, error: { status, name, message, details: {} } };
      };

      const rawEmail = typeof ctx.request.body.email === 'string' ? ctx.request.body.email : '';
      const email = rawEmail.trim().toLowerCase();

      if (!email) {
        reply(400, 'ApplicationError', 'Informe o e-mail da conta de administrador.');
        return;
      }

      const admin = (await strapi.db
        .query('admin::user')
        // $eqi, not a plain $eq: a stored address with different casing must never
        // produce a false "não está cadastrado" on a recovery screen.
        .findOne({ where: { email: { $eqi: email } } })) as { blocked?: boolean } | null;

      if (!admin) {
        const siteUser = await strapi.db
          .query('plugin::users-permissions.user')
          .findOne({ where: { email: { $eqi: email } } });

        reply(
          400,
          'ApplicationError',
          siteUser
            ? 'Este e-mail é uma conta do SITE (anunciante/cliente), não do painel. Recupere a senha do site em /esqueci-senha; para o painel, informe o e-mail de um administrador.'
            : 'Este e-mail não está cadastrado como administrador. Confira o endereço ou peça a outro administrador para redefinir sua senha.'
        );
        return;
      }

      if (admin.blocked) {
        reply(403, 'ForbiddenError', 'Esta conta de administrador está bloqueada.');
        return;
      }

      // Address belongs to an admin: let Strapi send its own reset e-mail.
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

        // Public Permissions — grant-only allowlist, idempotent on every boot.
        //
        // DO NOT bring back `updateMany({ data: { enabled: true } })`. Strapi 5 dropped the
        // `enabled` attribute from plugin::users-permissions.permission: the row *is* the grant
        // (the auth strategy rebuilds the public role's ability from `findMany({ where: { role:
        // { type: 'public' } } })` on every request). Updating a field that no longer exists gives
        // the DB layer no data to write, so it threw `Update requires data` — swallowed by the
        // catch below, which is why nobody noticed: the grant never happened and the Public role
        // answered 403 on /api/noticias, so the homepage silently fell back to `initialNews`
        // (diagnosed and reproduced locally 2026-09-30). Grant by making sure the row EXISTS;
        // never by flipping a flag, and never by creating a duplicate.
        try {
          const publicRole = (await strapi.db.query('plugin::users-permissions.role').findOne({
            where: { type: 'public' },
            populate: ['permissions'],
          })) as any;

          if (publicRole) {
            const actions = [
              'api::imovel.imovel.find',
              'api::imovel.imovel.findOne',
              'api::noticia.noticia.find',
              'api::noticia.noticia.findOne',
            ];

            const alreadyGranted: string[] = (publicRole.permissions ?? []).map(
              (permission: { action: string }) => permission.action
            );
            const created: string[] = [];

            for (const action of actions) {
              if (alreadyGranted.includes(action)) continue;

              // Same shape as Strapi's own role service (server/services/role.js): the DB layer
              // writes the up_permissions_role_lnk link row for us.
              await strapi.db.query('plugin::users-permissions.permission').create({
                data: { action, role: publicRole.id },
              });
              created.push(action);
            }

            // Verify by re-reading through the very service the request path uses. Logging an
            // intention is not evidence; this read is.
            const grantedNow: string[] = (
              await (strapi.service('plugin::users-permissions.permission') as any).findPublicPermissions()
            ).map((permission: { action: string }) => permission.action);

            const missing = actions.filter((action) => !grantedNow.includes(action));

            if (missing.length > 0) {
              console.error(
                `❌ [Bootstrap] Public permissions still missing: ${missing.join(', ')} — the public API will answer 403 for those routes`
              );
            } else {
              console.log(
                `✅ [Bootstrap] Public permissions ensured${
                  created.length ? ` (created: ${created.join(', ')})` : ' (all already present)'
                }.`
              );
            }
          } else {
            console.warn('[Bootstrap] Public role not found — public permission grant skipped.');
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
          const customFields = ['telefone', 'celular', 'cpf', 'cnpj', 'creci', 'nome_imobiliaria', 'nome_completo', 'tipo_usuario', 'locale', 'role'];
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
