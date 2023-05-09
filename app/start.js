#!/usr/bin/env node
const arg = require('arg');
const { app } = require('./app');
const DEFAULT_PORT = 7002;

const args = arg({
	// Types
	'--help': Boolean,
	'--version': Boolean,
	'--verbose': arg.COUNT, // Counts the number of times --verbose is passed
	'--port': Number, // --port <number> or --port=<number>
	'--name': String, // --name <string> or --name=<string>
	'--tag': [String], // --tag <string> or --tag=<string>

	// Aliases
	'-P': '--port',
	'-v': '--verbose',
	'-n': '--name', // -n <string>; result is stored in --name
	'--label': '--name' // --label <string> or --label=<string>;
	//     result is stored in --name
});

let port = args['--port'] || DEFAULT_PORT;

app.listen(port);
console.log('running: ' + port);