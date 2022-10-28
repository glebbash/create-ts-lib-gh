#!/usr/bin/env node

import { getProjectInfo } from './get-project-info';
import { setupProject } from './setup-project';

getProjectInfo().then(setupProject);
