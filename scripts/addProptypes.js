const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');

const pathAndMessageArr = [];

const rl = path =>
  readline.createInterface(
    path ? fs.createReadStream(path) : process.stdin,
    process.stdout
  );

const addPropTypes = () =>
  new Promise((resolve, reject) => {
    console.log('Adding PropTypes, hang tight!');

    pathAndMessageArr.map(props => {
      const { path, msg } = props;
      const file = path.split('/');
      const fileName = file[file.length - 1].split('.')[0];
      const allPropTypes = msg.map(x => x.split("'")[1]);
      const filteredPropTypes = [...new Set(allPropTypes)];

      fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        const propTypesStartRegex = new RegExp(`${fileName}.propTypes`);
        const dataArray = data.toString().split('\n');

        filteredPropTypes.map(prop =>
          data
            .toString()
            .split('\n')
            .map((line, i) => {
              const propHasDot = prop.indexOf('.') !== -1;
              const propTypesRule = `  ${
                propHasDot ? `[${prop}]` : prop
              }: PropTypes.string,`;
              if (propTypesStartRegex.test(line)) {
                console.log(
                  `${chalk.green(fileName)}: Adding PropType ${chalk.underline(
                    prop
                  )}`
                );
                dataArray.splice(i + 1, 0, propTypesRule);
              }
            })
        );

        fs.writeFile(path, dataArray.join('\n'), 'utf-8', error => {
          if (error) throw error;
          console.log('Added missing PropTypes to corresponding files!');
        });
      });
    });
    resolve();
    rl().close();
  });

const runScripts = async () => {
  // await checkGitStatus();
  try {
    await addPropTypes();
  } catch (err) {
    console.log(chalk.red('Aborting..'));
    process.stdin.destroy();
  }
};

const testScript = () =>
  new Promise((resolve, reject) => {
    const path =
      '/Users/stanfaas/Projects/learning/react-client/app/components/AnswerTypes/IfThen/IfThen.js';
    const msg = [
      "'displayType' is missing in props validation",
      "'displayType' is missing in props validation",
      "'onValueChange' is missing in props validation"
    ];
    const file = path.split('/');
    const fileName = file[file.length - 1].split('.')[0];
    const allPropTypes = msg.map(x => x.split("'")[1]);
    const filteredPropTypes = [...new Set(allPropTypes)];

    fs.readFile(path, 'utf8', (err, data) => {
      if (err) throw err;
      const propTypesStartRegex = new RegExp(`${fileName}.propTypes`);
      const dataArray = data.toString().split('\n');

      filteredPropTypes.map(prop =>
        data
          .toString()
          .split('\n')
          .map((line, i) => {
            const propTypesRule = `  ${prop}: PropTypes.string,`;
            if (propTypesStartRegex.test(line)) {
              dataArray.splice(i + 1, 0, propTypesRule);
            }
          })
      );

      fs.writeFile(path, dataArray.join('\n'), 'utf-8', error => {
        if (error) throw error;
        console.log('new file created!');
      });
    });
    resolve();
  });

runScripts();
