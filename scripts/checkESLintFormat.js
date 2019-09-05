const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const checkESLintFormat = addOrRemove =>
  new Promise((resolve, reject) => {
    const ruleId =
      addOrRemove === 'add' ? 'react/prop-types' : 'react/no-unused-prop-types';
    console.log('\nChecking for correct eslint format...\n');
    fs.readFile('package.json', 'utf-8', (err, data) => {
      if (err) reject(err);
      if (!data.includes('-f json -o eslintresults.json')) {
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
        reject('No valid eslint format');
      }

      console.log(chalk.yellow('Correct eslint format found, proceeding..'));

      const lintResultPath = path.join(process.cwd(), 'eslintresults.json');
      const lintResults = require(lintResultPath);

      console.log(chalk.yellow('Pulling linter results..'));

      const matchingResult = message => message.ruleId === ruleId;

      const pathAndMessageArr = lintResults
        .map(result => {
          const messageArr = result.messages
            .filter(matchingResult)
            .map(({ message }) => message);

          return { path: result.filePath, msg: messageArr };
        })
        .filter(result => result.msg.length);

      console.log(chalk.yellow('Linter results found and ready to use..'));
      resolve(pathAndMessageArr);
    });
  });

module.exports = checkESLintFormat;
