#!/usr/bin/env node
const shell = require('shelljs');
const path = require('path');
// const arg = require('arg');
const configFilePath = path.resolve(__dirname, '../ecosystem.config.js');
const arg = require('arg');
const startHandler = require('./start');
const stopHandler = require('./stop');
const watchHandler = require('./watch');

const args = arg({
	// Types
    '--port': Number,
	'--force': Boolean,
	// Aliases
    '-P': '--port',
	'-F': '--force',
});

const directive = args._[0];
const directiveList = [
    'start',
    'stop',
    'watch',
]
if (!directive || !~directiveList.indexOf(directive)) {
    // console.error('xxxxx')
    return console.error(`指令不存在。（所有指令：${directiveList.join(',')})`)
}

// console.log(process.argv, directive, args)

if (directive === 'start') {
    const port = args['--port'];
    return startHandler(port);
}
if (directive === 'stop') {
    return stopHandler();
}
if (directive === 'watch') {
    return watchHandler();
}