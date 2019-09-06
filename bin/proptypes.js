#! /usr/bin/env node
const chalk = require('chalk');
const checkGitStatus = require('../scripts/checkGitStatus');
const generateESLintReport = require('../scripts/generateESLintReport');
const addOrRemove = require('../scripts/addOrRemove');

const [, , ...args] = process.argv;

const index = async () => {
  try {
    console.log('\nThanks for using the PropTypes cli!');
    await checkGitStatus(args.includes('force'));
    await generateESLintReport();
    await addOrRemove(args);
  } catch (err) {
    console.log(chalk.red('\nAborting..'));
    process.stdin.destroy();
  }
};

index();
