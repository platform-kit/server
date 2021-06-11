require('dotenv').config()
var command = process.env.BUILD_COMMAND;

if(command == null){
    command = 'rm -r ./ssg; git clone https://github.com/platform-kit/platformkit-ui ssg; cd ssg; npm i; npm run build'
}

else {
    command = 'cd ./app; ' + command;
}

var shell = require('shelljs');

// Execute build command
if (shell.exec(command).code !== 0) {
    shell.echo('Error: Build command failed');
    shell.exit(1);
} else {
    shell.echo('Build command succeeded.');
}