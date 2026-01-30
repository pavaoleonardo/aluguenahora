import UploadPlugin from '@strapi/plugin-upload/admin';

const cloudinaryThumbnailPatch = {
  register(app) {
    const originalUploadPlugin = UploadPlugin.register;

    UploadPlugin.register = (app) => {
      originalUploadPlugin(app);

      app.injectContentManagerComponent('editView', 'media', 'MediaLibrary', {
        override: {
          getThumbnailUrl(file) {
            if (file.provider === 'cloudinary') {
              return file.url; // Use Cloudinary URL for preview
            }
            return file.url;
          },
        },
      });
    };
  },
};

export default cloudinaryThumbnailPatch;
