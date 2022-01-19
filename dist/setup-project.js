"use strict";
/* istanbul ignore file */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupProject = void 0;
// TODO: test this
const child_process_1 = __importDefault(require("child_process"));
const ejs_1 = require("ejs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const util_1 = require("util");
const exec = (0, util_1.promisify)(child_process_1.default.exec);
const encodeStringFriendly = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
async function setupProject(info) {
    const templateRoot = (0, path_1.join)(__dirname, '..', 'template');
    const libraryRoot = (0, path_1.join)(process.cwd(), info.library.name);
    await copyAndTransform(templateRoot, libraryRoot, info);
    const out = (...path) => (0, path_1.join)(libraryRoot, ...path);
    const src = (fileName) => out('src', fileName);
    await (0, promises_1.rename)(out('.out-gitignore'), out('.gitignore'));
    await (0, promises_1.rename)(src('lib-name.ts'), src(`${info.library.name}.ts`));
    await (0, promises_1.rename)(src('lib-name.spec.ts'), src(`${info.library.name}.spec.ts`));
    try {
        await exec(`cd ${info.library.name} && git init`);
    }
    catch (err) {
        console.error('Cannot initialize git repo');
    }
}
exports.setupProject = setupProject;
async function copyAndTransform(inputDir, outputDir, info) {
    const renderInfo = { ...info, str: encodeStringFriendly };
    for await (const fileName of listFileNames(inputDir)) {
        const templateFile = (0, path_1.join)(inputDir, fileName);
        const outputFile = (0, path_1.join)(outputDir, fileName);
        const fileContent = await (0, promises_1.readFile)(templateFile, { encoding: 'utf-8' });
        const transformedContent = (0, ejs_1.render)(fileContent, renderInfo);
        try {
            await (0, promises_1.mkdir)((0, path_1.dirname)(outputFile), { recursive: true });
        }
        catch (ignored) { }
        await (0, promises_1.writeFile)(outputFile, transformedContent);
    }
}
async function* listFileNames(absoluteDir, relativeDir = '') {
    const dirents = await (0, promises_1.readdir)(absoluteDir, { withFileTypes: true });
    for (const dirent of dirents) {
        const direntName = dirent.name;
        if (dirent.isDirectory()) {
            yield* listFileNames((0, path_1.join)(absoluteDir, direntName), (0, path_1.join)(relativeDir, direntName));
        }
        else {
            yield (0, path_1.join)(relativeDir, direntName);
        }
    }
}
//# sourceMappingURL=setup-project.js.map