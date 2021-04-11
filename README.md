# gh-create-ts-lib

[![Deploy](https://github.com/glebbash/gh-create-ts-lib/workflows/build/badge.svg)](https://github.com/glebbash/gh-create-ts-lib/actions)
[![Coverage Status](https://coveralls.io/repos/github/glebbash/gh-create-ts-lib/badge.svg?branch=master)](https://coveralls.io/github/glebbash/gh-create-ts-lib?branch=master)

Cli to create public typescript libraries hosted on github.

Usage:

```sh
npx gh-create-ts-lib
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

This project is [Mit Licensed](LICENSE).
