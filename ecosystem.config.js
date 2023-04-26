module.exports = {
    apps: [
      {
        name: 'my-app',
        script: 'npm',
        args: 'start',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          PORT: 80
        }
      }
    ]
  };
  