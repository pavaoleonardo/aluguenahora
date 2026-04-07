"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    host: env('HOST', '127.0.0.1'),
    port: env.int('PORT', 1337),
    url: env('PUBLIC_URL', '/'),
    app: {
        keys: env.array('APP_KEYS', ['recoveryKey123', 'recoveryKey456']),
    },
    apiToken: {
        salt: env('API_TOKEN_SALT', 'recoverySalt123'),
    },
    admin: {
        url: '/admin',
        auth: {
            secret: env('ADMIN_JWT_SECRET', 'recoveryAdminSecret123'),
        },
    },
    transfer: {
        token: {
            salt: env('TRANSFER_TOKEN_SALT', 'recoveryTransferSalt123'),
        },
    },
});
