require('dotenv').config()
var command = process.env.BUILD_COMMAND;

var shell = require('shelljs');

// Execute build command
if (shell.exec('cd app; ' + command).code !== 0) {
    shell.echo('Error: Build command failed');
    shell.exit(1);
} else {
    shell.echo('Error: Build command succeeded.');
}