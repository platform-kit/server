var shell = require('shelljs');

// Check for git
if (!shell.which('npx')) {
    shell.echo('Sorry, this script requires npx');
    shell.exit(1);
}

// Commit changes
if (shell.exec('cd app/prisma; npx prisma studio').code !== 0) {
    shell.echo('Error: Prisma Studio failed');
    shell.exit(1);
} else {
    shell.echo('Prisma Studio succeeded.');
}