import type { StrapiApp } from '@strapi/strapi/admin';
import AuthLogo from './extensions/logo.svg';
import favicon from './extensions/favicon.png';

// WHY THIS LINE EXISTS: Strapi 5.33 serves the admin panel as `<html lang="en">` with no
// `notranslate` meta, and its `config.head` only supports `favicon`/`title` (no `metas` — checked
// against the installed `@strapi/admin` types), so the head cannot be extended from here. A pt-BR
// browser (the owner's and Jack's) therefore gets Chrome's auto-translate, and Chrome's translation
// rewrites text nodes under React's feet: the panel throws
// `Failed to execute 'removeChild' on 'Node'` and shows mixed EN/PT strings with changed fonts.
// `translate="no"` on <html> is the documented opt-out. This runs at admin-bundle load, before
// React mounts, which is the earliest hook the app exposes — `register`/`bootstrap` are too late.
// The surgical alternative (a Koa middleware rewriting the admin HTML response) is deliberately NOT
// used: the served body can be a stream, and breaking the panel is worse than translating it.
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('translate', 'no');
}

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
