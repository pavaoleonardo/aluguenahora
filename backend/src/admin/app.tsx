import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['en', 'pt-BR'],
  },
  register(app: StrapiApp) {
    app.customFields.register({
      name: 'bairro-regiao',
      type: 'json',
      intlLabel: {
        id: 'custom-fields.bairro-regiao.label',
        defaultMessage: 'Bairro (com região)',
      },
      intlDescription: {
        id: 'custom-fields.bairro-regiao.description',
        defaultMessage: 'Selecione a região e o bairro',
      },
      components: {
        Input: async () => import('./components/BairroRegiaoInput'),
      },
    });
  },
  bootstrap(app: StrapiApp) {
    void app;
  },
};
