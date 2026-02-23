"use strict";
module.exports = async ({ strapi }) => {
  try {
    const users = await strapi.db.query('plugin::users-permissions.user').findMany();
    if(users.length === 0) return;
    const admin = users[0];
    
    const unlinked = await strapi.db.query('api::imovel.imovel').findMany({
      where: { usuario: null }
    });
    
    for (const p of unlinked) {
      console.log('Fixing property IDs', p.id, p.titulo, 'to user', admin.id);
      await strapi.db.query('api::imovel.imovel').update({
        where: { id: p.id },
        data: { usuario: admin.id }
      });
    }
  } catch(e) {
     console.error("error fixing", e);
  }
};
