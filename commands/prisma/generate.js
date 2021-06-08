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

// Get Prisma module
fs.access("./app/node_modules/.bin/prisma", function (error) {
    if (error) {
        console.log("Apps's Prisma module directory does not exist. Using default Prisma instance.")
        prismaModuleDir = "./node_modules/.bin/prisma";
        generate();
    } else {
        console.log("App's Prisma module directory exists.")
        prismaModuleDir = "./app/node_modules/.bin/prisma";
        generate();
    }
})

// Generate Prisma client
function generate() {
    if (shell.exec('node ' + prismaModuleDir + ' generate  --schema=app/prisma/schema.prisma').code !== 0) {
        shell.echo('Error: Prisma client generation failed.');
        shell.exit(1);
    } else {
        shell.echo('Error: Prisma client generation succeeded.');
    }
}

module.exports = {
    generate
}