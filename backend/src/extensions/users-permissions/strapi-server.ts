export default (plugin: any) => {
  // 1. Extend User Schema (Matches what we defined in the schema.json)
  plugin.contentTypes.user.schema.attributes = {
    ...plugin.contentTypes.user.schema.attributes,
    telefone: { type: 'string' },
    celular: { type: 'string' },
    creci: { type: 'string' },
    nome_imobiliaria: { type: 'string' },
    nome_completo: { type: 'string' },
    tipo_usuario: { type: 'enumeration', enum: ['corretor', 'proprietario'] },
  };

  // 2. Intercept Registration to handle custom fields safely in Strapi 5
  const registerRoute = plugin.routes['content-api'].routes.find(
    (route: any) => route.method === 'POST' && route.path === '/auth/local/register'
  );

  if (registerRoute) {
    const originalHandler = registerRoute.handler;
    registerRoute.handler = async (ctx: any) => {
      if (ctx.request.body) {
        const body = ctx.request.body;
        // Save to state to bypass Strapi 5 strict verification
        ctx.state.customRegistration = {
          telefone: body.telefone,
          celular: body.celular,
          creci: body.creci,
          nome_imobiliaria: body.nome_imobiliaria,
          nome_completo: body.nome_completo,
          tipo_usuario: body.tipo_usuario,
        };
        
        // Remove from body to prevent 400 Bad Request
        delete body.telefone;
        delete body.celular;
        delete body.creci;
        delete body.nome_imobiliaria;
        delete body.nome_completo;
        delete body.tipo_usuario;
      }
      return originalHandler(ctx);
    };
  }

  return plugin;
};
