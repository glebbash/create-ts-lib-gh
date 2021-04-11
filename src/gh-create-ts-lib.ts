import { setupProject } from './setup-project';
import { getProjectInfo } from './get-project-info';

export { setupProject };

if (require.main === module) {
  getProjectInfo().then(setupProject);
}
