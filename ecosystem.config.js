module.exports = {
  apps: [
    {
      name: 'holiplaces',
      cwd: '/var/www/holiplaces.com/current',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000 -H 127.0.0.1',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '700M',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
