const parseOrigins = (value: string) =>
  value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const matchOrigin = (origin: string, pattern: string) => {
  if (!pattern.includes('*')) {
    return origin === pattern;
  }

  const regex = new RegExp(`^${escapeRegex(pattern).replace(/\\\*/g, '.*')}$`);
  return regex.test(origin);
};

export default ({ env }) => {
  const isProd = env('NODE_ENV', 'development') === 'production';
  const configuredOrigins = parseOrigins(env('CORS_ORIGIN', ''));
  const frontendUrl = env('FRONTEND_URL', '').trim();
  const devOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://*.trycloudflare.com',
  ];

  const baseOrigins = configuredOrigins.length > 0 ? configuredOrigins : isProd ? [] : devOrigins;
  const allowedOrigins = frontendUrl ? [...new Set([...baseOrigins, frontendUrl])] : baseOrigins;

  return [
    'strapi::logger',
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'img-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
            'media-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
          },
        },
      },
    },
    {
      name: 'strapi::cors',
      config: {
        origin: (ctx) => {
          const requestOrigin = ctx.request.header.origin;

          if (!requestOrigin) return false;
          if (allowedOrigins.some((pattern) => matchOrigin(requestOrigin, pattern))) {
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
