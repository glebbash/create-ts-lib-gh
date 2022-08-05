import { getProjectInfo } from './get-project-info';
import { ProjectInfo, setupProject } from './setup-project';

jest.mock('./setup-project');
jest.mock('./get-project-info');

describe('create-ts-lib-gh', () => {
  it('gets project info and sets up project', async () => {
    const info: ProjectInfo = 1 as never;

    (getProjectInfo as jest.Mock).mockResolvedValue(info);

    await require('./create-ts-lib-gh');

    expect(getProjectInfo).toBeCalled();
    expect(setupProject).toBeCalledWith(info);
  });
});
