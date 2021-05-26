/* istanbul ignore file */

// TODO: test this

import input from '@inquirer/input';

import { ProjectInfo } from './setup-project';

const NPM_LIB_PATTERN = /^[a-z][a-z-]{0,213}$/;
const KEYWORDS_PATTERN = /^[a-z][a-z-]*(?: [a-z][a-z-]*)*$/;
const GH_USERNAME_PATTERN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export async function getProjectInfo(): Promise<ProjectInfo> {
  const libraryName = await input({
    message: 'Library name:',
    validate: (s) => NPM_LIB_PATTERN.test(s),
  });

  const libraryDescription = await input({
    message: 'Description:',
  });

  const libraryKeywords = await input({
    message: 'Keywords (separate with spaces):',
    validate: (s) => KEYWORDS_PATTERN.test(s),
  }).then((keywords) => keywords.split(' '));

  const authorName = await input({
    message: 'Author:',
  });

  const authorEmail = await input({
    message: 'Email:',
  });

  const githubUsername = await input({
    message: 'Github username:',
    default: authorName,
    validate: (s) => GH_USERNAME_PATTERN.test(s),
  });

  const githubRepo = await input({
    message: 'Github repository:',
    default: `${githubUsername}/${libraryName}`,
  });

  return {
    library: {
      name: libraryName,
      description: libraryDescription,
      keywords: libraryKeywords,
    },
    author: {
      name: authorName,
      email: authorEmail,
    },
    github: {
      repository: githubRepo,
    },
  };
}
