// strapi-server.ts
// 
// This file extends the users-permissions plugin.
// The ONLY thing we do here is remove the strict Yup body validator
// from the register route definition, so Strapi doesn't reject custom fields.
// 
// The actual custom field handling is done via:
//   1. Koa middleware in src/index.ts (strips fields BEFORE validation)
//   2. beforeCreate lifecycle in src/index.ts (re-attaches fields to DB write)

export default (plugin: any) => {
  // Remove the strict body schema from the register route so Strapi 5
  // doesn't reject our custom fields (nome_completo, telefone, etc.)
  const contentApiRoutes = plugin.routes?.['content-api']?.routes;
  if (contentApiRoutes) {
    const registerRoute = contentApiRoutes.find(
      (route: any) => route.path === '/auth/local/register' && route.method === 'POST'
    );

    if (registerRoute) {
      // Strapi 5 stores the Yup schema in route.request.body
      if (registerRoute.request) {
        delete registerRoute.request.body;
      }
      // Legacy fallback
      if (registerRoute.config) {
        delete registerRoute.config.validate;
      }
      console.log('✅ [strapi-server] Register route body validation removed.');
    }
  }

  return plugin;
};
