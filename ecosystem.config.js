const { appLogPath } = require('./utils');
// const execArgs = '';

module.exports = {
  apps: [
    {
      name: 'my-ci-app',
      script: './app/start.js',
      // args: execArgs,
      env: {
        NODE_ENV: 'sit',
      },
      error_file: appLogPath('error.log'),
      out_file: appLogPath('out.log'),
    },
  ],
};
