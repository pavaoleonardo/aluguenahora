export default (plugin: any) => {
  const originalRegister = plugin.controllers.auth.register;

  // 1. Override the route configuration to disable the strict body validator
  const contentApiRoutes = plugin.routes['content-api'].routes;
  const registerRoute = contentApiRoutes.find((route: any) => route.path === '/auth/local/register' && route.method === 'POST');
  
  if (registerRoute) {
    console.log('--- Found register route, disabling strict body validation ---');
    // In Strapi 5, validation is stored in the 'request' property
    if (registerRoute.request && registerRoute.request.body) {
      delete registerRoute.request.body;
    }
    // Also clear config.validate just in case of legacy behavior
    if (registerRoute.config) {
      delete registerRoute.config.validate;
    }
  }

  // 2. Override the controller to handle custom data safely
  plugin.controllers.auth.register = async (ctx: any) => {
    console.log('--- Registration Attempt ---');
    if (!ctx.request.body) return originalRegister(ctx);

    const { 
      telefone, 
      celular, 
      creci, 
      nome_imobiliaria, 
      nome_completo, 
      tipo_usuario 
    } = ctx.request.body;

    // Capture custom fields for later
    const customFields = { 
      telefone, 
      celular, 
      creci, 
      nome_imobiliaria, 
      nome_completo, 
      tipo_usuario 
    };

    // Remove them from the body to bypass core Strapi validation
    delete ctx.request.body.telefone;
    delete ctx.request.body.celular;
    delete ctx.request.body.creci;
    delete ctx.request.body.nome_imobiliaria;
    delete ctx.request.body.nome_completo;
    delete ctx.request.body.tipo_usuario;
    delete ctx.request.body.role; 

    try {
      // Execute original register logic
      await originalRegister(ctx);

      // 4. If registration was successful, update the newly created user with our custom fields
      if (ctx.body && ctx.body.user && ctx.body.user.id) {
        await strapi.entityService.update('plugin::users-permissions.user', ctx.body.user.id, {
          data: customFields as any
        });
      }
    } catch (err) {
      console.error('Registration Hook Error:', err);
      throw err;
    }
  };

  return plugin;
};
