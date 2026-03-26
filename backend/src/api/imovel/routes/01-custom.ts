export default {
  routes: [
    {
      method: 'POST',
      path: '/imoveis/upload-video',
      handler: 'api::imovel.imovel.uploadVideo',
      config: {
        auth: true, // Only authenticated users can upload videos
      },
    },
  ],
};
