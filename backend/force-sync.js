const strapi = require('@strapi/strapi');
strapi({ autoReload: false, serveAdminPanel: false }).start().then(async app => {
  console.log("Forcing production database schema sync...");
  try {
    await app.db.schema.sync();
    console.log("Successfully rebuilt any missing tables!");
  } catch(e) {
    console.log("Sync error:", e);
  }
  process.exit(0);
});
