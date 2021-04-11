import { ProjectInfo, setupProject } from './setup-project';
import { getProjectInfo } from './get-project-info';
import { mocked } from 'ts-jest/utils';

jest.mock('./setup-project');
jest.mock('./get-project-info');

describe('gh-create-ts-lib', () => {
  it('gets project info and sets up project', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const info: ProjectInfo = 1 as any;

    mocked(getProjectInfo).mockResolvedValue(info);

    await require('./gh-create-ts-lib');

    expect(getProjectInfo).toBeCalled();
    expect(setupProject).toBeCalledWith(info);
  });
});
