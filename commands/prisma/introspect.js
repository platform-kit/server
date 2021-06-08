var shell = require('shelljs');
var fs = require('fs-extra');

var prismaSchemaPath = 'temp/schema.prisma';
var prismaModuleDir = null;

var source = './prisma';
var destination = './temp';
fs.copy(source, destination, function (err) {
    if (err) {
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('Copy completed!')        
    introspect();
});

prismaModuleDir = "./node_modules/.bin/prisma";

function introspect() {
    if (shell.exec('node ' + prismaModuleDir + ' introspect --force').code !== 0) {
        shell.echo('Error: Prisma introspect failed.');
        shell.exit(1);
    } else {
        shell.echo('Prisma introspect succeeded.');
    }
}

module.exports = {
    introspect
}