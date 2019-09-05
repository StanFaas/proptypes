const fs = require('fs');
const chalk = require('chalk');

const removePropTypes = pathAndMessageArr => {
  new Promise((resolve, reject) => {
    console.log('Removing unused PropTypes, hang tight!\n');

    pathAndMessageArr.forEach(props => {
      const { path, msg } = props;
      const allMissingPropTypes = msg.map(x => x.split("'")[1]);
      const filteredMissingPropTypes = [...new Set(allMissingPropTypes)];

      fs.readFile(path, 'utf8', (err, data) => {
        if (err) reject(err);
        const dataArray = data.toString().split('\n');

        filteredMissingPropTypes.forEach(prop => {
          const propTypeRegex = new RegExp(`${prop}.*PropTypes.`);

          const propTypeLineNumber = dataArray.findIndex(line =>
            propTypeRegex.test(line)
          );

          dataArray.splice(propTypeLineNumber, 1);
        });

        const newFile = dataArray.join('\n');

        fs.writeFile(path, newFile, 'utf-8', error => {
          if (error) reject(error);
          resolve();
        });
      });
    });
  });
};

module.exports = removePropTypes;
