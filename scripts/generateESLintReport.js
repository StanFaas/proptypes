const { exec } = require('child_process');
const chalk = require('chalk');

const generateESLintReport = () =>
  new Promise((resolve, reject) => {
    exec('yarn eslint-report', (err, stdout) => {
      console.log(chalk.yellow(stdout));
      if (err) {
        console.log(
          chalk.red('You have not setup eslint-report in your package.json')
        );
        reject();
      } else {
        console.log(chalk.green('Generated ESLint report..'));
        resolve();
      }
    });
  });

module.exports = generateESLintReport;
