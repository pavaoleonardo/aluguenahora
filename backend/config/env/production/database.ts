export default ({ env }) => {
  console.log('🏗️ PRD: Config Database Loading...');
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        schema: env('DATABASE_SCHEMA', 'public'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      pool: {
        min: 2,
        max: 10,
        acquireTimeoutMillis: 30000,
        createTimeoutMillis: 30000,
      },
      useNullAsDefault: true,
    },
    settings: {
      // CRITICAL: Set to false to prevent 'must be owner of table' crashes
      forceMigration: false,
    },
  };
};
