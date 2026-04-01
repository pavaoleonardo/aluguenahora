export default ({ env }: { env: any }) => ({
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
