import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Allow Cloudflare tunnel hostnames for the admin dev server
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      allowedHosts: true,
    },
  });
};
