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

  return plugin;
};
