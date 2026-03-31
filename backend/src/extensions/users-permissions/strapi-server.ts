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

  // 2. Override the register controller to handle custom fields (Strapi 5 strictness)
  const originalRegister = plugin.controllers.auth.register;
  
  plugin.controllers.auth.register = async (ctx: any) => {
    console.log('[Auth interceptor] Receiving registration request...');
    console.log('[Auth interceptor] Body:', JSON.stringify(ctx.request.body));
    
    // Helper to format phone number to (67) XXXX-XXXX or (67) XXXXX-XXXX
    const formatPhone = (val: string) => {
      let cleaned = val.replace(/\D/g, '');
      if (cleaned.length === 0) return '';
      if (cleaned.length <= 8) {
        return `(67) ${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
      }
      return `(67) ${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    };

    // 1. Extract our custom parameters from the body
    const { nome_imobiliaria, creci, telefone, celular, ...registerData } = ctx.request.body;
    
    console.log('[Auth interceptor] Stripped data:', JSON.stringify(registerData));
    console.log('[Auth interceptor] Custom fields:', { nome_imobiliaria, creci, telefone, celular });

    // 2. Set the body to ONLY standard fields to avoid "Invalid parameters" error from Yup/Sanitizer
    ctx.request.body = registerData;
    
    try {
      // 3. Execute the original registration logic
      await originalRegister(ctx);
      console.log('[Auth interceptor] Original register response status:', ctx.status);
    } catch (err: any) {
      console.error('[Auth interceptor] Original register threw an error:', err.message);
      throw err;
    }
    
    // 4. If registration was successful (it will set ctx.body with { jwt, user }), update the user
    if (ctx.body && ctx.body.user && ctx.body.user.id) {
      const userId = ctx.body.user.id;
      
      console.log('[Auth interceptor] Updating user with formatted phones...');
      
      // Update the user record directly in the DB with the custom fields
      await strapi.db.query('plugin::users-permissions.user').update({
        where: { id: userId },
        data: {
          nome_imobiliaria,
          creci,
          telefone: telefone ? (telefone.startsWith('(67)') ? telefone : formatPhone(telefone)) : null,
          celular: celular ? (celular.startsWith('(67)') ? celular : formatPhone(celular)) : null
        }
      });
      
      // Refresh the user object in the response to include the new fields
      const updatedUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: userId }
      });
      
      ctx.body.user = updatedUser;
    }
  };

  // 3. Extend the user content type with custom fields for persistence
  if (plugin.contentTypes && plugin.contentTypes.user) {
    plugin.contentTypes.user.schema.attributes = {
      ...plugin.contentTypes.user.schema.attributes,
      nome_imobiliaria: { type: 'string' },
      creci: { type: 'string' },
      telefone: { type: 'string' },
      celular: { type: 'string' },
    };
  }

  return plugin;
};
