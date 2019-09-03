#! /usr/bin/env node

const readline = require('readline');
const chalk = require('chalk');
const checkESLintFormat = require('../scripts/checkESLintFormat');
const checkGitStatus = require('../scripts/checkGitStatus');
const addProptypes = () => require('../scripts/addProptypes');
const removeProptypes = () => console.log('script is not build yet..');

const [, , ...args] = process.argv;
const rl = readline.createInterface(process.stdin, process.stdout);

const index = async () => {
  try {
    if (!args.includes('force')) await checkGitStatus();
    await checkESLintFormat();
    // await addProptypes();
  } catch (err) {
    console.log(chalk.red('\nAborting..'));
    process.stdin.destroy();
  }
};

index();

// if (!args.length) {
//   rl.question(
//     `\nThanks for using the PropTypes cli!\n
// This cli has two commands:
// - add
// - remove\n
// Which would you like to use?
// add [a] or remove [r]?\n`,
//     cmd => {
//       switch (cmd) {
//         case 'a':
//         case 'A':
//           console.log('Lets add some props!');
//           addProptypes();
//           rl.close();
//           break;
//         case 'r':
//         case 'R':
//           console.log('Lets remove some props!');
//           removeProptypes();
//           rl.close();
//           break;
//         default:
//           console.log('No choice made, aborting..');
//           rl.close();
//       }
//     }
//   );
// }
