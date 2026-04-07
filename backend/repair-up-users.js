const { Client } = require('pg');

async function repairUpUsers() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'aluguenahora',
    user: 'strapi',
    password: 'MeuP0rt@Retrat0:2026$',
  });

  try {
    await client.connect();
    console.log('Repairing up_users table schema...');

    // Check existing columns
    const res = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'up_users'
    `);
    const existingColumns = res.rows.map(r => r.column_name);

    const columnsToAdd = [
      { name: 'username', type: 'VARCHAR(255)', unique: true },
      { name: 'email', type: 'VARCHAR(255)', unique: true },
      { name: 'provider', type: 'VARCHAR(255)', default: "'local'" },
      { name: 'password', type: 'VARCHAR(255)' },
      { name: 'reset_password_token', type: 'VARCHAR(255)' },
      { name: 'registration_token', type: 'VARCHAR(255)' },
      { name: 'confirmed', type: 'BOOLEAN', default: 'true' },
      { name: 'blocked', type: 'BOOLEAN', default: 'false' }
    ];

    for (const col of columnsToAdd) {
      if (!existingColumns.includes(col.name)) {
        console.log(`Adding column: ${col.name}`);
        let sql = `ALTER TABLE up_users ADD COLUMN "${col.name}" ${col.type}`;
        if (col.default) sql += ` DEFAULT ${col.default}`;
        await client.query(sql);
        
        if (col.unique) {
          console.log(`Adding unique constraint to ${col.name}`);
          try {
            await client.query(`ALTER TABLE up_users ADD CONSTRAINT "up_users_${col.name}_unique" UNIQUE ("${col.name}")`);
          } catch (err) {
            console.warn(`Could not add unique constraint to ${col.name} (maybe exists):`, err.message);
          }
        }
      }
    }

    console.log('✅ up_users table repaired successfully.');
  } catch (err) {
    console.error('Repair error:', err);
  } finally {
    await client.end();
  }
}

repairUpUsers();
