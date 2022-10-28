# create-ts-lib-gh

[![Deploy](https://github.com/glebbash/create-ts-lib-gh/workflows/build/badge.svg)](https://github.com/glebbash/create-ts-lib-gh/actions)
[![Coverage Status](https://coveralls.io/repos/github/glebbash/create-ts-lib-gh/badge.svg?branch=master)](https://coveralls.io/github/glebbash/create-ts-lib-gh?branch=master)

Cli to create public typescript libraries hosted on GitHub and published to NPM.

Usage:

```sh
npx create-ts-lib-gh
```

What's included:

- CI/CD:
  - github-actions: build test and publish to npm
  - husky(git-hooks): commit message linting, running tests
  - coverage: coveralls
- Formatting:
  - ESLint and Prettier
  - Editorconfig
- Testing:
  - Jest

This project is [MIT Licensed](LICENSE).
