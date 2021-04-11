/* istanbul ignore file */

// TODO: test this

import { ProjectInfo } from './setup-project';
import { prompt } from 'inquirer';

type PartialInfo = Omit<ProjectInfo, 'github'> & { githubUsername: string };

const NPM_LIB_PATTERN = /^[a-z][a-z-]{0,213}$/;

export async function getProjectInfo(): Promise<ProjectInfo> {
  const { githubUsername, ...partialInfo }: PartialInfo = await prompt([
    {
      name: 'library.name',
      message: 'Library name:',
      validate: (s) => NPM_LIB_PATTERN.test(s),
    },
    {
      name: 'library.description',
      message: 'Description:',
      filter: (s) => s.replaceAll('\\', '\\\\').replaceAll('"', '\\"').replace('\n', '\\n'),
    },
    {
      name: 'library.keywords',
      message: 'Keywords:',
      filter: (keywords: string) =>
        keywords.trim().length < 1 ? [] : keywords.split(',').map((k) => k.trim()),
    },
    {
      name: 'author.name',
      message: 'Author:',
    },
    {
      name: 'author.email',
      message: 'Email:',
    },
    {
      name: 'githubUsername',
      message: 'Github username:',
    },
  ]);

  const githubInfo: ProjectInfo['github'] = await prompt([
    {
      name: 'repository',
      message: 'Github repository:',
      default: `${githubUsername}/${partialInfo.library.name}`,
    },
  ]);

  return { ...partialInfo, github: githubInfo };
}
