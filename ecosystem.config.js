module.exports = {
  apps: [
    {
      name: 'aluguenahora-backend',
      cwd: './backend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'aluguenahora-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
