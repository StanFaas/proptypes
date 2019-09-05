const chalk = require('chalk');
const isGitClean = require('is-git-clean');

const checkGitStatus = force =>
  new Promise((resolve, reject) => {
    let clean = false;
    let errorMessage = 'Unable to determine if git directory is clean';
    try {
      clean = isGitClean.sync(process.cwd());
      errorMessage = 'Git directory is not clean';
    } catch (err) {
      if (
        err &&
        err.stderr &&
        err.stderr.indexOf('Not a git repository') >= 0
      ) {
        clean = true;
      }
    }

    if (!clean) {
      if (force) {
        console.log(
          chalk.yellow(`WARNING: ${errorMessage}. Forcibly continuing.`)
        );
      } else {
        console.log("\nWe're about to get started");
        console.log(
          chalk.bold(
            '\nBut before we continue, please stash or commit your git changes.'
          )
        );
        console.log(
          `\nYou may pass the ${chalk.underline(
            'force'
          )} argument to override this safety check.`
        );
        reject();
        process.exit(1);
      }
    }

    resolve();
  });

module.exports = checkGitStatus;
