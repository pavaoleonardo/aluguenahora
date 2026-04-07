import type { StrapiApp } from '@strapi/strapi/admin';
import AuthLogo from './extensions/logo.svg';
import favicon from './extensions/favicon.png';

export default {
  config: {
    head: {
      favicon,
    },
    auth: {
      logo: AuthLogo,
    },
    menu: {
      logo: AuthLogo,
    },
    locales: ['en', 'pt-BR'],
    translations: {
      en: {
        'Auth.form.welcome.title': 'Welcome to Alugue na Hora',
        'Auth.form.welcome.subtitle': 'Log in to manage properties',
        'app.components.LeftMenu.navbrand.title': 'Alugue na Hora',
        'app.components.LeftMenu.navbrand.workplace': 'Dashboard',
        'User': 'User',
        'Users': 'Users',
      },
      'pt-BR': {
        'Auth.form.welcome.title': 'Bem-vindo ao Alugue na Hora',
        'Auth.form.welcome.subtitle': 'Faça login para gerenciar os imóveis',
        'app.components.LeftMenu.navbrand.title': 'Alugue na Hora',
        'app.components.LeftMenu.navbrand.workplace': 'Painel',
        'User': 'Usuário',
        'Users': 'Usuários',
      },
    },
  },
  register(app: StrapiApp) {
    app.customFields.register({
      name: 'bairro-regiao',
      type: 'json',
      intlLabel: {
        id: 'custom-fields.bairro-regiao.label',
        defaultMessage: 'Bairro',
      },
      intlDescription: {
        id: 'custom-fields.bairro-regiao.description',
        defaultMessage: 'Selecione o bairro',
      },
      components: {
        Input: async () => import('./components/BairroRegiaoInput') as any,
      },
    });
  },
  bootstrap(app: StrapiApp) {
    void app;
  },
};
