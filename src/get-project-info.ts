/* istanbul ignore file */

// TODO: test this

import { ProjectInfo } from './setup-project';
import { prompt } from 'inquirer';

const NPM_LIB_PATTERN = /^[a-z][a-z-]{0,213}$/;
const KEYWORDS_PATTERN = /^[a-z][a-z-]*(?:,[a-z][a-z-]*)*$/;

const encodeStringFriendly = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');

export async function getProjectInfo(): Promise<ProjectInfo> {
  return await prompt([
    {
      name: 'library.name',
      message: 'Library name:',
      validate: (s) => NPM_LIB_PATTERN.test(s),
    },
    {
      name: 'library.description',
      message: 'Description:',
      filter: encodeStringFriendly,
    },
    {
      name: 'library.keywords',
      message: 'Keywords (separate with spaces):',
      validate: (s) => KEYWORDS_PATTERN.test(s),
      filter: (keywords: string) => keywords.split(' '),
    },
    {
      name: 'author.name',
      message: 'Author:',
      filter: encodeStringFriendly,
    },
    {
      name: 'author.email',
      message: 'Email:',
      filter: encodeStringFriendly,
    },
    {
      name: 'github.username',
      message: 'Github username:',
      filter: encodeStringFriendly,
      default: (info: ProjectInfo) => info.author.name,
    },
    {
      name: 'repository',
      message: 'Github repository:',
      default: (info: ProjectInfo & { github: { username: string } }) =>
        `${info.github.username}/${info.library.name}`,
    },
  ]);
}
