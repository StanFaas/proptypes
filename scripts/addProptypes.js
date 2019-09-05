const fs = require('fs');
const chalk = require('chalk');

const addPropTypes = pathAndMessageArr =>
  new Promise((resolve, reject) => {
    console.log('Adding missing PropTypes, hang tight!\n');

    pathAndMessageArr.forEach(props => {
      const { path, msg } = props;
      const file = path.split('/');
      const fileName = file[file.length - 1].split('.')[0];
      const allPropTypes = msg.map(x => x.split("'")[1]);
      const filteredPropTypes = [...new Set(allPropTypes)];

      fs.readFile(path, 'utf8', (err, data) => {
        if (err) reject(err);
        const dataArray = data.toString().split('\n');

        const hasPropTypes = dataArray.find(line =>
          /import PropTypes/.test(line)
        );

        const propTypesLocation =
          dataArray.findIndex(line => line.includes('.propTypes = {')) + 1;

        const exportDefaultLocation = dataArray.findIndex(line =>
          /export default/.test(line)
        );

        const setupPropTypesArr = [
          "import PropTypes from 'prop-types';",
          `${fileName}.propTypes = {`,
          '}'
        ];

        const addPropTypes = filteredPropTypes
          .map(prop => {
            if (prop.indexOf('.') !== -1) return;
            const propTypesRule = `  ${prop}: PropTypes.string,`;

            console.log(
              `${chalk.green(fileName)}: Adding PropType ${chalk.underline(
                prop
              )}`
            );
            return propTypesRule;
          })
          .filter(Boolean);

        const before = dataArray.slice(0, propTypesLocation);
        const after = dataArray.slice(propTypesLocation);

        if (!hasPropTypes) {
          console.log(
            chalk.yellow(
              'Import statement and proptypes object missing, adding them now..'
            )
          );
          after.splice(1, 0, setupPropTypesArr[0]);
          after.splice(
            exportDefaultLocation + 1,
            0,
            setupPropTypesArr[1],
            ...addPropTypes,
            setupPropTypesArr[2]
          );
        }

        const newFile = hasPropTypes
          ? [...before, ...addPropTypes, ...after].join('\n')
          : after.join('\n');

        fs.writeFile(path, newFile, 'utf-8', error => {
          if (error) reject(error);
          resolve();
        });
      });
    });
  });

module.exports = addPropTypes;
