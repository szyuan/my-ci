#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const yaml = require('js-yaml');

// 获取当前项目的根目录路径
const projectRootPath = path.resolve();
let projectName = '';

// 读取yml配置文件
try {
  const wsYmlPath = path.join(projectRootPath, '.easy-ci.yml');
  const ymlConfig = yaml.load(fs.readFileSync(wsYmlPath, 'utf8'));
  // console.log(doc);

  if (ymlConfig.project) {
    projectName = ymlConfig.project
    newWorkspace(projectName);
  } else {
    throw 'project属性不能为空';
  }
} catch (err) {
  if (err?.code === 'EEXIST') {
    console.error(`${ymlConfig.project}已存在，请在yml配置中设置一个不重复的project属性`);
  } else {
    console.error('项目初始化失败: ', err);
  }
}

function newWorkspace(projectName) {
  const wsInfoPath = path.resolve(os.homedir(), '.easy-ci', projectName);
  fs.openSync(wsInfoPath, 'wx'); // 如果文件已经存在，会抛出错误
  fs.writeFileSync(wsInfoPath, `PATH=${projectRootPath}`);
  console.log('File created successfully.');
}