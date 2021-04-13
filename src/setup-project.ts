/* istanbul ignore file */

// TODO: test this

import { mkdir, readdir, readFile, rename, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { render } from 'ejs';
import child_process from 'child_process';
import { promisify } from 'node:util';

const exec = promisify(child_process.exec);

export type ProjectInfo = {
  library: {
    name: string;
    description: string;
    keywords: string[];
  };
  author: {
    name: string;
    email: string;
  };
  github: {
    repository: string;
  };
};

const encodeStringFriendly = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');

export async function setupProject(info: ProjectInfo): Promise<void> {
  const templateRoot = join(__dirname, '..', 'template');
  const libraryRoot = join(process.cwd(), info.library.name);

  await copyAndTransform(templateRoot, libraryRoot, info);

  const src = (fileName: string) => join(libraryRoot, 'src', fileName);

  await rename(src('lib-name.ts'), src(`${info.library.name}.ts`));
  await rename(src('lib-name.spec.ts'), src(`${info.library.name}.spec.ts`));

  try {
    await exec('git init');
  } catch (err) {
    console.error('Cannot initialize git repo');
  }
}

async function copyAndTransform(inputDir: string, outputDir: string, info: ProjectInfo) {
  const renderInfo = { ...info, str: encodeStringFriendly };

  for await (const fileName of listFileNames(inputDir)) {
    const templateFile = join(inputDir, fileName);
    const outputFile = join(outputDir, fileName);

    const fileContent = await readFile(templateFile, { encoding: 'utf-8' });
    const transformedContent = render(fileContent, renderInfo);

    try {
      await mkdir(dirname(outputFile), { recursive: true });
    } catch (ignored) {}

    await writeFile(outputFile, transformedContent);
  }
}

async function* listFileNames(absoluteDir: string, relativeDir = ''): AsyncGenerator<string> {
  const dirents = await readdir(absoluteDir, { withFileTypes: true });
  for (const dirent of dirents) {
    const direntName = dirent.name;
    if (dirent.isDirectory()) {
      yield* listFileNames(join(absoluteDir, direntName), join(relativeDir, direntName));
    } else {
      yield join(relativeDir, direntName);
    }
  }
}
