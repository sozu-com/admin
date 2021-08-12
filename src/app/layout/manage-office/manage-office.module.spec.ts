import { ManageOfficeModule } from './manage-office.module';

describe('ManageOfficeModule', () => {
  let manageOfficeModule: ManageOfficeModule;

  beforeEach(() => {
    manageOfficeModule = new ManageOfficeModule();
  });

  it('should create an instance', () => {
    expect(manageOfficeModule).toBeTruthy();
  });
});
