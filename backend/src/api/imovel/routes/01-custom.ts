export default {
  routes: [
    {
      method: 'GET',
      path: '/imoveis/fix',
      handler: 'api::imovel.imovel.fix',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/imoveis/upload-video',
      handler: 'api::imovel.imovel.uploadVideo',
      config: {
        auth: false, // We'll handle auth in the controller if needed, or keep it open for the multipart form
      },
    },
  ],
};
