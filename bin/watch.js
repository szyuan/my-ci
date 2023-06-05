#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const yaml = require('js-yaml');
const arg = require('arg');

const userHomeDir = os.homedir();
const dataDir = '.my-ci';
const configFileName = '.my-ci.yml'

const args = arg({
	// Types
	'--force': Boolean,
	// Aliases
	'-F': '--force',
});

module.exports = function() {
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
      newWorkspace(projectName, args['--force']);
    } else {
      throw 'project属性不能为空';
    }
  } catch (err) {
    if (err?.code === 'EEXIST') {
      console.error(`${projectName}已存在，请在yml配置中设置一个不重复的project属性，或者使用-F覆盖`);
    } else if (err?.code === 'ENOENT') {
      console.error(`没有找到配置文件: ${configFileName}`);
      console.info(`（要在当前目录下创建ci工作目录，请先创建.my-ci.yml配置文件）`);
    } else {
      console.error('项目初始化失败: ', err);
    }
  }

  function newWorkspace(projectName, force) {
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

    try {
      fs.openSync(wsInfoPath, 'wx'); // 如果文件已经存在，会抛出错误
    } catch (e) {
      if (e?.code === 'EEXIST') {
        if (force) {
          fs.unlinkSync(wsInfoPath);
          console.log('删除已有work信息');
        } else {
          throw e;
        }
      }
    }
    fs.writeFileSync(wsInfoPath, `PATH=${projectRootPath}`);
    console.log('my-ci project created successfully.');
  }
}