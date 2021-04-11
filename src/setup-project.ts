import { resolve } from 'path';
import { readdir, readFile, rename, writeFile } from 'fs/promises';
import { join } from 'node:path';
import { render } from 'ejs';

export type ProjectInfo = {
  library: {
    name: string;
    description: string;
    tags: string[];
  };
  author: {
    name: string;
    email: string;
  };
  github: {
    repository: string;
  };
};

export async function setupProject(info: ProjectInfo): Promise<void> {
  const templateRoot = join(__dirname, '..', 'template');
  const libraryRoot = join(process.cwd(), info.library.name);

  await copyAndTransform(templateRoot, libraryRoot, info);

  const src = (fileName: string) => join(libraryRoot, 'src', fileName);

  await rename(src('lib-name.ts'), src(`${info.library.name}.ts`));
  await rename(src('lib-name.spec.ts'), src(`${info.library.name}.spec.ts`));
}

async function copyAndTransform(inputDir: string, outputDir: string, info: ProjectInfo) {
  for await (const fileName of listFileNames(inputDir)) {
    const templateFile = join(inputDir, fileName);
    const outputFile = join(outputDir, fileName);

    const fileContent = await readFile(templateFile, { encoding: 'utf-8' });
    const transformedContent = render(fileContent, info);
    await writeFile(outputFile, transformedContent);
  }
}

async function* listFileNames(dir: string, subDir = '/'): AsyncGenerator<string> {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const direntName = dirent.name;
    const absoluteFilePath = resolve(dir, direntName);
    if (dirent.isDirectory()) {
      yield* listFileNames(absoluteFilePath, direntName);
    } else {
      yield resolve(subDir, direntName);
    }
  }
}
