const { Client } = require('pg');

async function searchAllTables() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'aluguenahora',
    user: 'strapi',
    password: 'MeuP0rt@Retrat0:2026$',
  });

  const searchString = 'dfjrbxgdiw3q90sinstiny4c';

  try {
    await client.connect();
    console.log(`Searching for "${searchString}" across all tables...`);

    // Get all tables and columns
    const res = await client.query(`
      SELECT table_name, column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND data_type IN ('text', 'character varying', 'character')
    `);

    const rows = res.rows;
    for (const row of rows) {
      const { table_name, column_name } = row;
      try {
        const result = await client.query(`
          SELECT 1 FROM "${table_name}" 
          WHERE "${column_name}" = $1 
          LIMIT 1
        `, [searchString]);

        if (result.rows.length > 0) {
          console.log(`\n✅ FOUND in table "${table_name}", column "${column_name}"`);
        }
      } catch (err) {
        // Skip errors (e.g. table not found or permission issues)
      }
    }
  } catch (err) {
    console.error('Search error:', err);
  } finally {
    await client.end();
    console.log('\nSearch completed.');
  }
}

searchAllTables();
