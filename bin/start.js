#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const yaml = require('js-yaml');

const userHomeDir = os.homedir();
const dataDir = '.my-ci';
const configFileName = '.my-ci.yml'

// 获取当前项目的根目录路径
const projectRootPath = path.resolve();
let projectName = '';

// 读取yml配置文件
try {
  const wsYmlPath = path.join(projectRootPath, configFileName);
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
    console.error(`${projectName}已存在，请在yml配置中设置一个不重复的project属性`);
  } else if (err?.code === 'ENOENT') {
    console.error(`没有找到配置文件: ${configFileName}`);
  } else {
    console.error('项目初始化失败: ', err);
  }
}

function newWorkspace(projectName) {
  // .my-ci文件夹不存在则先创建
  try {
    fs.mkdirSync(path.resolve(userHomeDir, dataDir));
    console.log(`工具初始化${dataDir}`);
  } catch(err) {
    if (err.code === 'EEXIST') {
      console.log('工具已初始化');
    } else {
      throw err;
    }
  }

  // workspace初始化
  const wsInfoPath = path.resolve(os.homedir(), dataDir, projectName);
  fs.openSync(wsInfoPath, 'wx'); // 如果文件已经存在，会抛出错误
  fs.writeFileSync(wsInfoPath, `PATH=${projectRootPath}`);
  console.log('my-ci project created successfully.');
}