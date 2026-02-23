"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseOrigins = (value) => value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const matchOrigin = (origin, pattern) => {
    if (!pattern.includes('*')) {
        return origin === pattern;
    }
    const regex = new RegExp(`^${escapeRegex(pattern).replace(/\\\*/g, '.*')}$`);
    return regex.test(origin);
};
exports.default = ({ env }) => {
    const isProd = env('NODE_ENV', 'development') === 'production';
    const configuredOrigins = parseOrigins(env('CORS_ORIGIN', ''));
    const frontendUrl = env('FRONTEND_URL', '').trim();
    const devOrigins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://*.trycloudflare.com',
    ];
    const baseOrigins = configuredOrigins.length > 0 ? configuredOrigins : isProd ? ['https://aluguenahora.vercel.app'] : devOrigins;
    const allowedOrigins = frontendUrl ? [...new Set([...baseOrigins, frontendUrl, 'https://aluguenahora.vercel.app'])] : [...new Set([...baseOrigins, 'https://aluguenahora.vercel.app'])];
    return [
        'strapi::logger',
        'strapi::errors',
        {
            name: 'strapi::security',
            config: {
                contentSecurityPolicy: {
                    useDefaults: true,
                    directives: {
                        'connect-src': ["'self'", 'https:'],
                        'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com', 'market-assets.strapiapp.com'],
                        'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com', 'market-assets.strapiapp.com'],
                        'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                        'frame-src': ["'self'"],
                    },
                },
            },
        },
        {
            name: 'strapi::cors',
            config: {
                origin: (ctx) => {
                    const requestOrigin = ctx.request.header.origin;
                    if (!requestOrigin)
                        return false;
                    // Normalize origin for comparison
                    const normalizedOrigin = requestOrigin.toLowerCase();
                    if (allowedOrigins.some((pattern) => matchOrigin(normalizedOrigin, pattern.toLowerCase()))) {
                        return requestOrigin;
                    }
                    return false;
                },
                headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            },
        },
        'strapi::poweredBy',
        'strapi::query',
        'strapi::compression',
        {
            name: 'strapi::body',
            config: {
                formLimit: env('BODY_FORM_LIMIT', '5mb'),
                jsonLimit: env('BODY_JSON_LIMIT', '1mb'),
                textLimit: env('BODY_TEXT_LIMIT', '1mb'),
                formidable: {
                    maxFileSize: env.int('UPLOAD_MAX_FILE_SIZE', 5 * 1024 * 1024),
                    multiples: true,
                },
            },
        },
        'strapi::session',
        'strapi::favicon',
        'strapi::public',
    ];
};
