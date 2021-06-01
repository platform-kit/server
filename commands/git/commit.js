var shell = require('shelljs');

// Check for git
if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

// Commit changes
if (shell.exec('cd app; git add -A; git commit -am "Auto-commit"').code !== 0) {
    shell.echo('Error: Git commit failed');
    shell.exit(1);
} else {
    shell.echo('Error: Git commit succeeded.');
}