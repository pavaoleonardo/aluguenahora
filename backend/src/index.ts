import type { Core } from '@strapi/strapi';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.customFields.register({ name: 'bairro-regiao', type: 'json' });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('🏗️ [Recovery] Initializing Strapi in Safe Mode...');
    
    try {
      const pluginStore = strapi.store({ type: 'plugin', name: 'users-permissions' });
      
      const advancedSettings = await pluginStore.get({ key: 'advanced' }) as any;
      if (advancedSettings) {
        advancedSettings.email_confirmation = false;
        await pluginStore.set({ key: 'advanced', value: advancedSettings });
        console.log('✅ [Recovery] Registration bypass active.');
      }
    } catch (err) {
      console.warn('[Recovery] Bootstrap error (skipping):', err.message);
    }

    // Minimal Lifecycle Hook
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

    console.log('🚀 [Recovery] Server active on port 1337');
  },
};
