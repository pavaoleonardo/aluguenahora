const { createStrapi } = require('@strapi/strapi');

async function runTest() {
  const app = createStrapi();
  await app.load();
  
  const users = await app.db.query('plugin::users-permissions.user').findMany();
  const u = users[0];
  console.log('User:', u.id, u.documentId);

  // 1. Create Property
  const doc = await app.documents('api::imovel.imovel').create({
     data: {
        titulo: 'Test Rel',
        preco: 1000,
        finalidade: 'venda',
        tipo: 'Studio',
        usuario: u.documentId
     }
  });
  console.log('Created Property:', doc.documentId);
  
  // 1b. Check if user is linked
  const f0 = await app.documents('api::imovel.imovel').findOne({ documentId: doc.documentId, populate: ['usuario'] });
  console.log('F0 Usuario:', f0.usuario?.id);

  // 2. Try Update
  await app.documents('api::imovel.imovel').update({
     documentId: doc.documentId,
     data: { usuario: u.documentId }
  });
  const f1 = await app.documents('api::imovel.imovel').findOne({ documentId: doc.documentId, populate: ['usuario'] });
  console.log('F1 Usuario:', f1.usuario?.id);

  // 3. Try Update with Object Connect
  await app.documents('api::imovel.imovel').update({
     documentId: doc.documentId,
     data: { usuario: { connect: [u.documentId] } }
  });
  const f2 = await app.documents('api::imovel.imovel').findOne({ documentId: doc.documentId, populate: ['usuario'] });
  console.log('F2 Usuario:', f2.usuario?.id);
  
  process.exit(0);
}
runTest().catch(console.error);
