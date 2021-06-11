require('dotenv').config()
var command = process.env.BUILD_COMMAND;

if(command == null){
    command = 'rm -r app/ssg; git clone https://github.com/platform-kit/platformkit-ui app/ssg; cd app/ssg; npm i; npm run build'
}

var shell = require('shelljs');

// Execute build command
if (shell.exec('cd app; ' + command).code !== 0) {
    shell.echo('Error: Build command failed');
    shell.exit(1);
} else {
    shell.echo('Build command succeeded.');
}