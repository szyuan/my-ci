const path = require('path');
const os = require('os');
const fs = require('fs');
const yaml = require('js-yaml');
const ini = require('ini');
const { ymlConfigReserveKey } = require('./const');

const userHomeDir = os.homedir();
const dataDir = '.my-ci';
const configFileName = '.my-ci.yml';
const logDir = 'logs';


function appDataPath(sub = '') {
    return path.resolve(userHomeDir, dataDir, sub);
}
function appLogPath(sub = '') {
    return path.resolve(userHomeDir, dataDir, logDir, sub);
}

function readWorkYML(workName) {
    const workspacePath = getWorkspacePath(workName);
    const wsYmlPath = path.join(workspacePath, configFileName);
    const fileData = yaml.load(fs.readFileSync(wsYmlPath, 'utf8'));
    const configData = {
        jobs: [],
        project: fileData.project,
        origin: fileData,
    }
    Object.keys(fileData).forEach(key => {
        if (!ymlConfigReserveKey.has(key)) {
            configData.jobs.push(fileData[key]);
        }
    })
    return configData;
}

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
    appDataPath,
    appLogPath,
    readWorkYML,
    getWorkspacePath,
    dataDir,
    configFileName,
}