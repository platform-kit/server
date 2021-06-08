var shell = require('shelljs');

// Check for git
if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

// Commit changes
if (shell.exec('cd app; git push').code !== 0) {
    shell.echo('Error: Git push failed');
    shell.exit(1);
} else {
    shell.echo('Git push succeeded.');
}