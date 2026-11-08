// These fallbacks are public (this repository is public) and exist only so a fresh
// clone can boot Strapi in development. Production must never use them.
const REQUIRED_IN_PRODUCTION = [
  'APP_KEYS',
  'API_TOKEN_SALT',
  'ADMIN_JWT_SECRET',
  'TRANSFER_TOKEN_SALT',
];

export default ({ env }) => {
  const nodeEnv = env('NODE_ENV', process.env.NODE_ENV ?? 'development');

  // Fail closed: a production boot with a missing secret would silently fall back to
  // the guessable values below, which anyone can read in the repo. The four vars were
  // verified present in the production env file before this guard was added, so it cannot
  // fire on a normal deploy -- it exists to stop a future one from booting with public keys.
  if (nodeEnv === 'production') {
    const missing = REQUIRED_IN_PRODUCTION.filter((key) => !env(key));

    if (missing.length > 0) {
      throw new Error(
        `[config/server] Missing required env vars in production: ${missing.join(', ')}. ` +
          'Set them in backend/.env and restart. The development fallbacks in this file are ' +
          'public and must never be used in production.'
      );
    }
  }

  return {
    host: env('HOST', '127.0.0.1'),
    port: env.int('PORT', 1337),
    url: env('PUBLIC_URL', '/'),
    app: {
      keys: env.array('APP_KEYS', ['dev-only-app-key-1', 'dev-only-app-key-2']),
    },
    apiToken: {
      salt: env('API_TOKEN_SALT', 'dev-only-api-token-salt'),
    },
    admin: {
      url: '/admin',
      auth: {
        secret: env('ADMIN_JWT_SECRET', 'dev-only-admin-jwt-secret'),
      },
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT', 'dev-only-transfer-token-salt'),
      },
    },
  };
};
