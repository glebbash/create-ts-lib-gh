"use strict";
/* istanbul ignore file */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectInfo = void 0;
// TODO: test this
const input_1 = __importDefault(require("@inquirer/input"));
const NPM_LIB_PATTERN = /^[a-z][a-z-]{0,213}$/;
const KEYWORDS_PATTERN = /^[a-z][a-z-]*(?: [a-z][a-z-]*)*$/;
const GH_USERNAME_PATTERN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
async function getProjectInfo() {
    const libraryName = await (0, input_1.default)({
        message: 'Library name:',
        validate: (s) => NPM_LIB_PATTERN.test(s),
    });
    const libraryDescription = await (0, input_1.default)({
        message: 'Description:',
    });
    const libraryKeywords = await (0, input_1.default)({
        message: 'Keywords (separate with spaces):',
        validate: (s) => KEYWORDS_PATTERN.test(s),
    }).then((keywords) => keywords.split(' '));
    const authorName = await (0, input_1.default)({
        message: 'Author:',
    });
    const authorEmail = await (0, input_1.default)({
        message: 'Email:',
    });
    const githubUsername = await (0, input_1.default)({
        message: 'Github username:',
        default: authorName,
        validate: (s) => GH_USERNAME_PATTERN.test(s),
    });
    const githubRepo = await (0, input_1.default)({
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
exports.getProjectInfo = getProjectInfo;
//# sourceMappingURL=get-project-info.js.map