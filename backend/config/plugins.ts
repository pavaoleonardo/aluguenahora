export default ({ env }: { env: any }) => ({
  // WHY THIS EXISTS: `@strapi/plugin-cloud` is installed as a dependency, so Strapi
  // auto-enables it. On 5.58 it renders the "Plan / Manage subscription" card and the
  // Growth entitlements in Settings > Overview, fed from Strapi's licence registry by
  // the instance UUID - the cancelled subscription keeps answering "Growth" while the
  // local licence row is already gone, so nothing in the DB can clear that card.
  // The project is self-hosted on a VPS and will never be deployed to Strapi Cloud,
  // so the plugin has no other purpose here. Re-enable by deleting this block.
  cloud: {
    enabled: false,
  },
  upload: {
    config: {
      sizeLimit: env.int('UPLOAD_MAX_FILE_SIZE', 100 * 1024 * 1024),
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp-mail.outlook.com'),
        port: env.int('SMTP_PORT', 587),
        secure: env.bool('SMTP_SECURE', false),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_DEFAULT_FROM', 'Alugue na Hora <noreply@mail.aluguenahora.com.br>'),
        defaultReplyTo: env('SMTP_DEFAULT_REPLY_TO', 'noreply@mail.aluguenahora.com.br'),
      },
    },
  },
});
