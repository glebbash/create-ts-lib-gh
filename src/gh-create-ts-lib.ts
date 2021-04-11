import { setupProject } from './setup-project';
import { getProjectInfo } from './get-project-info';

getProjectInfo().then(setupProject);
