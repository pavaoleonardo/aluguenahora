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
  ],
};
