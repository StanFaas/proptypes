const readline = require('readline');
const chalk = require('chalk');
const checkESLintFormat = require('../scripts/checkESLintFormat');
const addPropTypes = require('./addPropTypes');
const removePropTypes = require('./removePropTypes');

const rl = readline.createInterface(process.stdin, process.stdout);

const addOrRemove = args => {
  if (args.includes('add')) {
    makeAChoice('add');
  } else if (args.includes('remove')) {
    makeAChoice('remove');
  } else {
    rl.question(
      `\nThis cli has two commands:
- add
- remove\n
Which would you like to use?
add [a] or remove [r]?\n`,
      cmd => {
        switch (cmd) {
          case 'a':
          case 'A':
            makeAChoice('add');
            break;
          case 'r':
          case 'R':
            makeAChoice('remove');
            break;
          default:
            console.log(chalk.red('Missing the right input, aborting..'));
            rl.close();
        }
      }
    );
  }
};

const makeAChoice = choice => {
  choice === 'add'
    ? console.log('\nLets add some props!')
    : console.log('Lets remove some props!');
  runModification(choice);
};

const runModification = choice => {
  const adding = choice === 'add';

  checkESLintFormat(choice)
    .then(pathAndMessageArr =>
      adding
        ? addPropTypes(pathAndMessageArr)
        : removePropTypes(pathAndMessageArr)
    )
    .then(() =>
      adding
        ? console.log('All missing PropTypes should be added to your project!')
        : console.log(
            'All unused PropTypes should be removed from your project!'
          )
    )
    .catch(err => console.log(err))
    .then(() => process.stdin.destroy());
};

module.exports = addOrRemove;
