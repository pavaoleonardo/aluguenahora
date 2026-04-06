module.exports = (plugin: any) => {
  // 1. Override the role service factor to fix the count query for Strapi 5
  const originalRoleServiceFactory = plugin.services.role;
  
  plugin.services.role = ({ strapi }: { strapi: any }) => {
    const originalService = originalRoleServiceFactory({ strapi });
    
    return {
      ...originalService,
      
      async find() {
        const roles = await strapi.db
          .query('plugin::users-permissions.role')
          .findMany({ orderBy: [{ name: 'asc' }] });

        for (const role of roles) {
          // FIX: Use scalar ID instead of nested object { id: role.id }
          // This is the correct syntax for Strapi 5 Query Engine
          // We also wrap it in try-catch in case some tables are still missing
          try {
            role.nb_users = await strapi.db
              .query('plugin::users-permissions.user')
              .count({ where: { role: role.id } });
          } catch (err) {
            console.error(`Error counting users for role ${role.name}:`, err.message);
            role.nb_users = 0;
          }
        }

        return roles;
      },
    };
  };


  // 3. Extend the user content type with custom fields for persistence
  // We use a more robust merging strategy for Strapi 5 to ensure Username/Email are never lost
  if (plugin.contentTypes && plugin.contentTypes.user) {
    const existingAttributes = plugin.contentTypes.user.schema.attributes || {};
    
    // Check if core fields are present. If for some reason they are missing during boot, we force them back.
    const coreFields = {
      username: { type: 'string', minLength: 3, unique: true, configurable: false, required: true },
      email: { type: 'email', minLength: 3, configurable: false, required: true },
      password: { type: 'password', minLength: 6, configurable: false, private: true },
      provider: { type: 'string', configurable: false },
      confirmed: { type: 'boolean', default: false, configurable: false },
      blocked: { type: 'boolean', default: false, configurable: false },
      role: { type: 'relation', relation: 'manyToOne', target: 'plugin::users-permissions.role', inverse: 'users', configurable: false },
    };

    plugin.contentTypes.user.schema.attributes = {
      ...coreFields,
      ...existingAttributes, // Keep whatever we already had
      nome_imobiliaria: { type: 'string' },
      creci: { type: 'string' },
      telefone: { type: 'string' },
      celular: { type: 'string' },
      nome_completo: { type: 'string' },
    };
    
    console.log('✅ [Strapi-Server] Unified User Schema: merged core fields with custom fields.');
  }

  // 4. Inject a middleware to handle registration custom fields without 400 Bad Request errors
  if (plugin.routes['content-api']) {
    plugin.routes['content-api'].routes.forEach((route: any) => {
      if (route.method === 'POST' && route.path === '/auth/local/register') {
        const originalMiddleware = route.config?.middlewares || [];
        route.config.middlewares = [
          ...originalMiddleware,
          async (ctx: any, next: any) => {
            // Before validation: Move custom fields to state and remove from body
            if (ctx.request.body) {
              const body = ctx.request.body;
              ctx.state.customRegistration = {
                telefone: body.telefone,
                celular: body.celular,
                creci: body.creci,
                nome_imobiliaria: body.nome_imobiliaria,
                nome_completo: body.nome_completo,
              };
              
              // Clean body for validation
              delete body.telefone;
              delete body.celular;
              delete body.creci;
              delete body.nome_imobiliaria;
              delete body.nome_completo;
              delete body.role; // Don't let users set their own role
            }
            return next();
          }
        ];
      }
    });
  }

  return plugin;
};
