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
        'nome_completo': 'Nome Completo',
        'telefone': 'Telefone',
        'celular': 'Celular',
        'tipo_usuario': 'Tipo de Usuário',
        'creci': 'CRECI',
        'nome_imobiliaria': 'Nome da Imobiliária',
        'Imóvel': 'Imóvel',
        'Notícia': 'Notícia',
        'content-manager.plugin.name': 'Gerenciador de Conteúdo',
        'content-manager.content-types.plugin::users-permissions.user.creci': 'CRECI',
        'content-manager.content-types.plugin::users-permissions.user.telefone': 'Telefone',
        'content-manager.content-types.plugin::users-permissions.user.celular': 'Celular',
        'content-manager.content-types.plugin::users-permissions.user.nome_completo': 'Nome Completo',
        'content-manager.content-types.plugin::users-permissions.user.tipo_usuario': 'Tipo de Usuário',
        'content-manager.content-types.plugin::users-permissions.user.nome_imobiliaria': 'Nome da Imobiliária',
        'content-manager.content-types.plugin::users-permissions.user.confirmed': 'Confirmado',
        'content-manager.content-types.plugin::users-permissions.user.blocked': 'Bloqueado',
        'content-manager.content-types.plugin::users-permissions.user.email': 'E-mail',
        'content-manager.content-types.plugin::users-permissions.user.username': 'Nome de Usuário',
        'Users-Permissions.User.creci': 'CRECI',
        'Users-Permissions.User.telefone': 'Telefone',
        'Users-Permissions.User.celular': 'Celular',
        'Users-Permissions.User.nome_completo': 'Nome Completo',
        'Users-Permissions.User.tipo_usuario': 'Tipo de Usuário',
        'Users-Permissions.User.nome_imobiliaria': 'Nome da Imobiliária',
        'Users-Permissions.User.confirmed': 'Confirmado',
        'Users-Permissions.User.blocked': 'Bloqueado',
        'Users-Permissions.User.email': 'E-mail',
        'Users-Permissions.User.username': 'Nome de Usuário',
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
