#!/usr/bin/env node
const arg = require('arg');
const { app } = require('./app');
const DEFAULT_PORT = 7002;

const args = arg({
	'--port': Number, // --port <number> or --port=<number>
	'-P': '--port',
});

let port = args['--port'] || DEFAULT_PORT;
console.log(args)

app.listen(port);
console.log('running: ' + port);