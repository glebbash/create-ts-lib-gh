#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_project_info_1 = require("./get-project-info");
const setup_project_1 = require("./setup-project");
(0, get_project_info_1.getProjectInfo)().then(setup_project_1.setupProject);
//# sourceMappingURL=create-ts-lib-gh.js.map