import type { Core } from '@strapi/strapi';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    // 1. Mandatory Custom Field Registration
    strapi.customFields.register({ name: 'bairro-regiao', type: 'json' });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('🏗️ [Safe Mode] Strapi is booting...');
    
    // 2. Simple Registration Bypass
    try {
      const pluginStore = strapi.store({ type: 'plugin', name: 'users-permissions' });
      const advancedSettings = await pluginStore.get({ key: 'advanced' }) as any;
      if (advancedSettings) {
        advancedSettings.email_confirmation = false;
        await pluginStore.set({ key: 'advanced', value: advancedSettings });
      }
    } catch (e) {
      console.warn('[Safe Mode] Skipping settings bypass:', e.message);
    }

    console.log('🚀 [Safe Mode] Server is listening on Port 1337');
  },
};
