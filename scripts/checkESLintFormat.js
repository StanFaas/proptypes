const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const checkESLintFormat = () =>
  new Promise((resolve, reject) => {
    console.log('\nChecking for correct eslint format...\n');
    fs.readFile('package.json', 'utf-8', (err, data) => {
      if (data.includes('-f json -o eslintresults.json')) {
        console.log(chalk.yellow('Correct eslint format found, proceeding..'));

        const lintResultPath = path.join(__dirname, '..', 'eslintresults.json');
        const lintResults = require(lintResultPath);

        console.log(chalk.yellow('Pulling linter results..'));
        lintResults.map(result => {
          const messageArr = [];

          result.messages.filter(message => {
            if (message.ruleId === 'react/prop-types') {
              messageArr.push(message.message);
            }
            return false;
          });

          if (messageArr.length > 0) {
            pathAndMessageArr.push({ path: result.filePath, msg: messageArr });
          }
          return false;
        });

        console.log(chalk.yellow('Linter results found and ready to use..'));
        resolve();
      } else {
        console.log(
          chalk.red(
            `Incorrect eslint format found.\nPlease change eslint format to ${chalk.underline(
              'json'
            )} and output name to ${chalk.underline(
              'eslintresults.json'
            )}.\n\nFor reference, check: ${chalk.underline(
              'https://github.com/StanFaas/proptypes#eslint-format'
            )}`
          )
        );
        reject();
      }
    });
  });

module.exports = checkESLintFormat;
