![npm (scoped)](https://img.shields.io/npm/v/@stanfaas/proptypes?style=flat-square)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@stanfaas/proptypes?label=install%20size&style=flat-square)

# proptypes

A NodeJS script that automatically adds or removes PropTypes to your react projects.

## Table of Contents

1. [Installation and Preparation](#installation-and-preparation)
2. [Usage](#usage)
3. [Filing Issues](#filing-issues)
4. [Releases](#releases)
5. [Semantic Versioning Policy](#semantic-versioning-policy)
6. [Author](#author)

## <a name="installation-and-preparation"></a>Installation and preparation

Prerequisites:

- [Node.js](https://nodejs.org/) (`^8.10.0`, `^10.13.0`, or `>=11.10.1`), npm version 3+.
- [ESLint](https://eslint.org) (Any version, but the latest would be preferred).

You can install proptypes using npm:

```
npm install @stanfaas/proptypes --save-dev
```

or using yarn:

```
yarn add @stanfaas/proptypes
```

You should then add a eslint-report script to your package.json like this:

```
# package.json

...
"scripts": {
  "eslint-report": "./node_modules/.bin/eslint [your dir] -f json -o eslintresults.json",
  ...
}
```

**Note:** Be sure to replace [your dir] with your actual directory that you'd like to lint.

Lets run down on what we've done here. Like normal, we've added a eslint script that you can run like `yarn eslint` or `npm eslint`. However, we also added a `-f` and `-o`, these stand for `format` and `ouput file path` respectively.  
So we have set the format to `JSON` and we output that JSON file into `eslintresults.json` which will automatically be put into the root folder of your project.

Another important thing you need to do, if you don't have them already, is to add the following rules to your `.eslintrc` (or `.eslintrc.js`):

```
"react/no-unused-prop-types": 1,
"react/prop-types": 1,
```

This makes sure your linter will show warnings when props are not set as PropTypes and when PropTypes are not used. If you want, you can also change the 1 to 2. It will then give you an error instead of an warning.

### Prepare ESLint report

After installing and setting up the things I've stated above, you should run the following commands from your project's root directory in your terminal.

`yarn eslint-report`

or

`npm run eslint-report`

This will create the JSON formatted file that we've setup earlier. Proptypes needs this to be able to parse.

## <a name="usage"></a>Usage

This CLI is not complicated at all. It only has add and remove functionality.
To use it, just run:

### Basic usage

`./node_modules/.bin/proptypes`

You'll then get the choice to either add missing PropTypes, or remove redundant ones.

### Add missing proptypes

To add missing proptypes you only have to run:

`./node_modules/.bin/proptypes add`

### Remove unused PropTypes

To remove unused PropTypes you run:

`./node_modules/.bin/proptypes remove`

### Is git clean?

The CLI will automatically check whether your project is clean or not. If not, it will tell you to stash or commit your code.
If you don't want that, then pass the `force` argument to the CLI like the following example:

`./node_modules/.bin/proptypes force`

This will add missing PropTypes and forces the CLI to continue, disregarding the fact that your git directory is not clean.

## <a name="filing-issues"></a>Filing Issues

I'm always open to PRs and will check issues regularly. Whenever you have any questions or suggestions file an issue.

## <a name="releases"></a>Releases

Whenever there is an update, I will release. Whether that will be a patch release, minor release or major release.

## <a name="semantic-versioning-policy"></a>Semantic Versioning Policy

I follow [semantic versioning](https://semver.org). Here is a short overview of what that entails.

Given a version number MAJOR.MINOR.PATCH, increment the:

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards compatible manner, and
- PATCH version when you make backwards compatible bug fixes.
  Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

## <a name="author"></a>Author

<table><tbody><tr><td align="center" valign="top" width="11%">
<a href="https://github.com/StanFaas">
<img src="https://github.com/StanFaas.png?s=75" width="75" height="75"><br />
StanFaas
</a>
</td></tr></tbody></table>
