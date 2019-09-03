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
        console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
      } else {
        console.log(
          chalk.yellow(
            "We're going to add all missing PropTypes to your project\n" +
              'Thanks for using us!'
          )
        );
        console.log(
          chalk.yellow(
            '\nBut before we continue, please stash or commit your git changes.'
          )
        );
        console.log(
          chalk.yellow(
            '\nYou may use the --force flag to override this safety check.'
          )
        );
        rl().close();
        reject();
        process.exit(1);
      }
    }

    resolve();
  });

module.exports = checkGitStatus;
