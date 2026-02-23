const strapi = require('@strapi/strapi');

async function run() {
  const app = strapi();
  
  await app.start();

  try {
    const users = await app.db.query('plugin::users-permissions.user').findMany();
    if(users.length === 0) { console.log("No users."); process.exit(0); }
    
    const adminUser = users[0];
    console.log('Fixing unlinked properties. Will attribute to user ID:', adminUser.id, adminUser.username);
    
    const unlinked = await app.db.query('api::imovel.imovel').findMany({
       populate: ['usuario']
    });

    for (const p of unlinked) {
        if (!p.usuario) {
            console.log('Linking property', p.id, p.titulo, 'to user', adminUser.id);
            await app.db.query('api::imovel.imovel').update({
                where: { id: p.id },
                data: { usuario: adminUser.id }
            });
        }
    }

  } catch(e) {
    console.error(e);
  }

  process.exit();
}

run();
