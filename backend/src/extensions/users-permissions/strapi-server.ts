export default (plugin: any) => {
  const originalRegister = plugin.controllers.auth.register;

  plugin.controllers.auth.register = async (ctx: any) => {
    console.log('--- Registration Attempt ---');
    console.log('Body:', JSON.stringify(ctx.request.body, null, 2));

    if (!ctx.request.body) return originalRegister(ctx);

    // We intercept the request body to extract custom fields
    const { 
      telefone, 
      celular, 
      creci, 
      nome_imobiliaria, 
      nome_completo, 
      tipo_usuario 
    } = ctx.request.body;

    // Stick them in state so the lifecycle hook can grab them safely
    ctx.state.customRegistration = {
      telefone,
      celular,
      creci,
      nome_imobiliaria,
      nome_completo,
      tipo_usuario
    };

    // Strip these fields from the body so the original controller doesn't complain/filter
    // This avoids the 400 Bad Request if it's strictly validating the DTO
    const originalBody = { ...ctx.request.body };
    delete ctx.request.body.telefone;
    delete ctx.request.body.celular;
    delete ctx.request.body.creci;
    delete ctx.request.body.nome_imobiliaria;
    delete ctx.request.body.nome_completo;
    delete ctx.request.body.tipo_usuario;
    delete ctx.request.body.role; // Also strip role just in case

    try {
      return await originalRegister(ctx);
    } catch (err) {
      // If it fails, restore body for debugging if needed
      ctx.request.body = originalBody;
      throw err;
    }
  };

  return plugin;
};
