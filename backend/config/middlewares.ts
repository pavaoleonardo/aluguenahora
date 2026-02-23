export default ({ env }) => {
  const isProd = env('NODE_ENV', 'development') === 'production';
  const backendUrl = env('RENDER_EXTERNAL_URL', 'https://aluguenahora.onrender.com');
  const frontendUrls = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://aluguenahora.vercel.app',
    'https://www.aluguenahora.vercel.app',
    backendUrl
  ];

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
        origin: frontendUrls,
        headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
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
