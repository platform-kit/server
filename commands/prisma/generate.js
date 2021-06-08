var shell = require('shelljs');
var fs = require('fs');

var prismaSchemaDir = null;
var prismaModuleDir = null;

/*
fs.access("./temp", function (error) {
    if (error) {
        console.log("Apps's Prisma schema directory does not exist.")        
    } else {
        console.log("App's Prisma schema directory exists.")
    }
})
*/
prismaSchemaDir = "./temp";

// Generate Prisma client
prismaModuleDir = "./node_modules/.bin/prisma";
function generate() {
    if (shell.exec('node ' + prismaModuleDir + ' generate  --schema=temp/schema.prisma').code !== 0) {
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