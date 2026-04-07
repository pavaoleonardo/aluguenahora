
const { createStrapi } = require('@strapi/strapi');

async function checkModel() {
  const strapi = await createStrapi().bootstrap();
  const model = strapi.getModel('plugin::users-permissions.user');
  console.log('Model Attributes:', JSON.stringify(Object.keys(model.attributes), null, 2));
  process.exit(0);
}

checkModel().catch(err => {
  console.error(err);
  process.exit(1);
});
