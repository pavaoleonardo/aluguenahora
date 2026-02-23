export default {
  routes: [
    {
      method: 'GET',
      path: '/imoveis/fix',
      handler: 'imovel.fix',
      config: {
        auth: false,
      },
    },
  ],
};
