#!/usr/bin/env node
const shell = require('shelljs');
const path = require('path');
const configFilePath = path.resolve(__dirname, '../ecosystem.config.js');

module.exports = function() {
    shell.exec(`pm2 stop ${configFilePath}`);
}