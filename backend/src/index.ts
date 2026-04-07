import type { Core } from '@strapi/strapi';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.customFields.register({ name: 'bairro-regiao', type: 'json' });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 1. Basic SMTP Fix & Registration Bypass
    try {
      const pluginStore = strapi.store({ type: 'plugin', name: 'users-permissions' });
      
      const templateSettings = await pluginStore.get({ key: 'email' }) as any;
      if (templateSettings?.email_confirmation) {
        templateSettings.email_confirmation.options.from.email = 'noreply@mail.aluguenahora.com.br';
        templateSettings.email_confirmation.options.from.name = 'Alugue na Hora';
        await pluginStore.set({ key: 'email', value: templateSettings });
      }

      const advancedSettings = await pluginStore.get({ key: 'advanced' }) as any;
      if (advancedSettings) {
        advancedSettings.email_confirmation = false; // Emergency bypass
        await pluginStore.set({ key: 'advanced', value: advancedSettings });
        console.log('✅ [Recovery] Registration bypass enabled.');
      }
    } catch (err) {
      console.warn('[Recovery] Bootstrap settings warning:', err.message);
    }

    // 2. Minimal Lifecycle Hook for Custom Fields
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
      }
    });

    console.log('🚀 [Recovery] Server stabilized and listening.');
  },
};
