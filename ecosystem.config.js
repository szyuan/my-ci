const { appLogPath } = require('./utils');
const path = require('path');
// const execArgs = '';

// console.log(process.argv);
const args = process.argv.slice(5);  // 去掉前4个参数
const argsStr = args.join(' ');  // 将所有参数拼接成字符串

module.exports = {
  apps: [
    {
      name: 'my-ci-app',
      script: path.resolve(__dirname, './app/start.js'),
      args: argsStr,
      env: {
        NODE_ENV: 'sit',
      },
      error_file: appLogPath('error.log'),
      out_file: appLogPath('out.log'),
    },
  ],
};
