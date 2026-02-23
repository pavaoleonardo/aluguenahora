const { createStrapi } = require('@strapi/strapi');

async function run() {
  const strapi = createStrapi();
  await strapi.load();
  await strapi.server.mount();

  const users = await strapi.db.query('plugin::users-permissions.user').findMany();
  if(!users.length) { console.log('nada'); return; }
  const u = users[0];

  const before = await strapi.db.query('api::imovel.imovel').findMany({where:{usuario:null}});
  console.log('antes', before.length);

  for(const b of before){
    // Correct v5 programmatic relation update syntax:
    await strapi.documents('api::imovel.imovel').update({
       documentId: b.documentId,
       data: { usuario: u.documentId }
    });
  }
  
  const after = await strapi.db.query('api::imovel.imovel').findMany({where:{usuario:null}});
  console.log('depois', after.length);
  process.exit();
}
run();
