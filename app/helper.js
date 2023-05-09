const fs = require('fs');
const ini = require('ini');
const { appDataPath } = require('../utils');

function getWorkspacePath(workName) {
    if (!workName) {
        return console.error('Failed to read workspace configuration file: workName is empty');
    }
    const workDataFilePath = appDataPath(workName);
    try {
        const workData = ini.parse(fs.readFileSync(workDataFilePath, 'utf-8'));
        return workData.PATH;
    } catch (e) {
        console.error('Failed to read workspace configuration file: ', workDataFilePath);
        console.error(`请确认工作目录是否初始化: 在部署服务器的${workName}工作目录中执行 my-ci init`);
        throw e;
    }
}

module.exports = {
    getWorkspacePath
}