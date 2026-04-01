const strapi = require('@strapi/strapi');
strapi().start().then(app => {
  const plugin = app.plugin('users-permissions');
  console.log(JSON.stringify(plugin.routes, null, 2));
  process.exit(0);
});
