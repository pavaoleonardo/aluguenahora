export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://api.aluguenahora.com.br'),
  app: {
    keys: env.array('APP_KEYS', ['recoveryKey789', 'recoveryKey000']),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'recoverySalt789'),
  },
  admin: {
    url: '/admin',
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'recoveryAdminSecret789'),
    },
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'recoveryTransferSalt789'),
    },
  },
});
