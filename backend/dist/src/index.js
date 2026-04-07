"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
// Optimize sharp for low memory environments
sharp_1.default.concurrency(1);
sharp_1.default.cache(false);
const geocodeAddress = async (endereco, bairro, cidade) => {
    var _a;
    if (!endereco || !endereco.trim()) {
        return null;
    }
    const bairroStr = typeof bairro === 'object' && bairro !== null && 'bairro' in bairro
        ? String((_a = bairro.bairro) !== null && _a !== void 0 ? _a : '')
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
            const response = await axios_1.default.get('https://nominatim.openstreetmap.org/search', {
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
        }
        catch (error) {
            console.error(`[Geocoding] Error with variation "${fullAddress}": ${error.message}`);
        }
    }
    return null;
};
const applyRegistrationFields = (data, custom) => {
    if (!custom) {
        return;
    }
    if (custom.telefone)
        data.telefone = custom.telefone;
    if (custom.celular)
        data.celular = custom.celular;
    if (custom.creci)
        data.creci = custom.creci;
    if (custom.nome_imobiliaria)
        data.nome_imobiliaria = custom.nome_imobiliaria;
    if (custom.nome_completo)
        data.nome_completo = custom.nome_completo;
    if (custom.tipo_usuario)
        data.tipo_usuario = custom.tipo_usuario;
};
exports.default = {
    async register({ strapi }) {
        strapi.customFields.register({
            name: 'bairro-regiao',
            type: 'json',
        });
        void geocodeAddress;
    },
    bootstrap({ strapi }) {
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
                    const templateSettings = (await pluginStore.get({ key: 'email' }));
                    if (templateSettings === null || templateSettings === void 0 ? void 0 : templateSettings.email_confirmation) {
                        templateSettings.email_confirmation.options.from.email = 'noreply@mail.aluguenahora.com.br';
                        templateSettings.email_confirmation.options.from.name = 'Alugue na Hora';
                        templateSettings.email_confirmation.options.response_email = 'noreply@mail.aluguenahora.com.br';
                        templateSettings.reset_password.options.from.email = 'noreply@mail.aluguenahora.com.br';
                        templateSettings.reset_password.options.from.name = 'Alugue na Hora';
                        templateSettings.reset_password.options.response_email = 'noreply@mail.aluguenahora.com.br';
                        await pluginStore.set({ key: 'email', value: templateSettings });
                        console.log('✅ [Bootstrap] Email templates re-aligned.');
                    }
                }
                catch (e) {
                    console.warn('[Bootstrap] Could not update email templates:', e.message);
                }
                // Advanced Settings
                try {
                    const advancedSettings = (await pluginStore.get({ key: 'advanced' }));
                    if (advancedSettings) {
                        advancedSettings.email_confirmation_redirection = 'https://aluguenahora.com.br/login?confirmed=true';
                        await pluginStore.set({ key: 'advanced', value: advancedSettings });
                        console.log('✅ [Bootstrap] Advanced settings re-aligned.');
                    }
                }
                catch (e) {
                    console.warn('[Bootstrap] Could not update advanced settings:', e.message);
                }
                // Permissions
                try {
                    const authenticatedRole = await strapi.db.query('plugin::users-permissions.role').findOne({
                        where: { type: 'authenticated' },
                    });
                    if (authenticatedRole) {
                        await strapi.db.query('plugin::users-permissions.permission').updateMany({
                            where: {
                                role: authenticatedRole.id,
                                action: 'plugin::users-permissions.user.update',
                            },
                            data: { enabled: true },
                        });
                        console.log('✅ [Bootstrap] Authenticated permissions updated.');
                    }
                }
                catch (e) {
                    console.warn('[Bootstrap] Could not update permissions:', e.message);
                }
            }
            catch (err) {
                console.warn('[Bootstrap] Plugin configuration error:', err.message);
            }
        })();
        // 2. Lifecycle Hooks
        strapi.db.lifecycles.subscribe({
            models: ['plugin::users-permissions.user'],
            async beforeCreate(event) {
                var _a, _b;
                const { data } = event.params;
                const ctx = strapi.requestContext.get();
                applyRegistrationFields(data, ((_a = ctx === null || ctx === void 0 ? void 0 : ctx.state) === null || _a === void 0 ? void 0 : _a.customRegistration) || ((_b = ctx === null || ctx === void 0 ? void 0 : ctx.request) === null || _b === void 0 ? void 0 : _b.body));
            },
            async beforeUpdate(event) {
                var _a;
                const { data } = event.params;
                const ctx = strapi.requestContext.get();
                applyRegistrationFields(data, (_a = ctx === null || ctx === void 0 ? void 0 : ctx.request) === null || _a === void 0 ? void 0 : _a.body);
            },
        });
        // 3. Database Schema Integrity (Safe Mode & Non-Destructive)
        void (async () => {
            try {
                if (!strapi.db || !strapi.db.connection)
                    return;
                console.log('🔍 [Bootstrap] Verifying database integrity...');
                const hasTable = await strapi.db.connection.schema.hasTable('up_users');
                if (hasTable) {
                    // Add missing columns only
                    const customFields = ['telefone', 'celular', 'creci', 'nome_imobiliaria', 'nome_completo', 'tipo_usuario', 'locale', 'role'];
                    for (const fieldName of customFields) {
                        const hasCol = await strapi.db.connection.schema.hasColumn('up_users', fieldName);
                        if (!hasCol) {
                            await strapi.db.connection.schema.alterTable('up_users', (table) => {
                                if (fieldName === 'role')
                                    table.integer('role');
                                else
                                    table.string(fieldName, 255);
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
                            }
                            catch (e) {
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
                            }
                            catch (e) {
                                console.warn(`[Bootstrap] Property heal failed (${item.id}):`, e.message);
                            }
                        }
                    }
                }
                else {
                    console.warn('🚨 [Bootstrap] up_users table is missing! This is a critical error.');
                    // We DO NOT recreate the table here anymore, as it's too dangerous.
                    // The administrator must investigate why the table is missing.
                }
            }
            catch (err) {
                console.warn('[Bootstrap] Database integrity check failed:', err.message);
            }
        })();
        // 4. Seeding News (Safe Mode)
        void (async () => {
            try {
                const newsCount = await strapi.db.query('api::noticia.noticia').count();
                if (newsCount === 0) {
                    console.log('🌱 [Bootstrap] Seeding initial news...');
                    const newsToSeed = [
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
                        await strapi.documents('api::noticia.noticia').create({
                            data: item,
                            status: 'published',
                        });
                    }
                    console.log('✅ [Bootstrap] News seeded.');
                }
            }
            catch (e) {
                console.warn('[Bootstrap] News seeding failed:', e.message);
            }
        })();
    },
};
