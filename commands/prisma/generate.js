var shell = require('shelljs');
var fs = require('fs');

var prismaSchemaDir = null;
var prismaModuleDir = null;

fs.access("./app/prisma", function (error) {
    if (error) {
        console.log("Apps's Prisma schema directory does not exist.")
        prismaSchemaDir = "./app/prisma";
    } else {
        console.log("App's Prisma schema directory exists.")
    }
})

// Generate Prisma client
prismaModuleDir = "./node_modules/.bin/prisma";
function generate() {
    if (shell.exec('node ' + prismaModuleDir + ' generate  --schema=app/prisma/schema.prisma').code !== 0) {
        shell.echo('Error: Prisma client generation failed.');
        shell.exit(1);
    } else {
        shell.echo('Prisma client generation succeeded.');
    }
}
generate();

module.exports = {
    generate
}