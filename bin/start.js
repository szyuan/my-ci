const shell = require('shelljs');
const path = require('path');
const configFilePath = path.resolve(__dirname, '../ecosystem.config.js');
const args = process.argv.slice(2);  // 去掉前两个参数
const argsStr = args.join(' ');  // 将所有参数拼成字符串

module.exports = function(port) {
    let sh = `pm2 start ${configFilePath}`;
    if (port) {
        sh += ` -- --port ${port}`;
    }
    // sh = `pm2 start ${configFilePath} -- ${argsStr}`;
    console.log('start shell: ', sh);
    shell.exec(sh);
}