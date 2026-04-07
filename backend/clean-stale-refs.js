const { Client } = require('pg');

async function cleanStaleRefs() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'aluguenahora',
    user: 'strapi',
    password: 'MeuP0rt@Retrat0:2026$',
  });

  const staleId = 'dfjrbxgdiw3q90sinstiny4c';

  try {
    await client.connect();
    console.log(`Cleaning up stale references to ID: ${staleId}`);

    // Find all tables that might have a document_id reference
    const res = await client.query(`
      SELECT table_name, column_name 
      FROM information_schema.columns 
      WHERE column_name LIKE '%document_id%' OR table_name LIKE '%_lnk'
    `);

    const tables = res.rows.map(r => r.table_name);
    const uniqueTables = [...new Set(tables)];

    for (const table of uniqueTables) {
      // Check if table has 'document_id' or similar
      const colsRes = await client.query(`
        SELECT column_name FROM information_schema.columns WHERE table_name = '${table}'
      `);
      const cols = colsRes.rows.map(r => r.column_name);

      for (const col of cols) {
        if (col.includes('id') || col.includes('doc')) {
           const deleteRes = await client.query(`
             DELETE FROM "${table}" WHERE "${col}"::text = $1
           `, [staleId]);
           if (deleteRes.rowCount > 0) {
             console.log(`✅ Removed ${deleteRes.rowCount} stale references from ${table}.${col}`);
           }
        }
      }
    }

    console.log('✅ Cleanup complete.');
  } catch (err) {
    console.error('Cleanup error:', err);
  } finally {
    await client.end();
  }
}

cleanStaleRefs();
