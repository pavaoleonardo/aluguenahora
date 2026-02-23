export default ({ env }: { env: any }) => ({
  upload: {
    config: {
      sizeLimit: env.int('UPLOAD_MAX_FILE_SIZE', 5 * 1024 * 1024),
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
});
