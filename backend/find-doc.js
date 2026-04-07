
const { createStrapi } = require('@strapi/strapi');

async function findDocument() {
  const idToFind = 'dfjrbxgdiw3q90sinstiny4c';
  console.log(`Starting Strapi to search for Document ID: ${idToFind}...`);
  
  // Create the app instance without starting the full server if possible
  const app = await createStrapi().load();
  
  const contentTypes = Object.keys(app.contentTypes);
  
  for (const uid of contentTypes) {
    // Skip internal and non-relevant content types
    if (uid.startsWith('admin::') || uid.startsWith('strapi::')) continue;
    
    try {
      // Use Document Service to find the document
      const result = await app.documents(uid).findOne({
        documentId: idToFind,
      });
      
      if (result) {
        console.log(`\n✅ FOUND in ${uid}:`);
        console.log(JSON.stringify(result, null, 2));
      }
    } catch (err) {
      // Just keep searching
    }
  }
  
  console.log('\nSearch finished.');
  process.exit(0);
}

findDocument().catch(err => {
  console.error('Fatal error starting Strapi:', err);
  process.exit(1);
});
