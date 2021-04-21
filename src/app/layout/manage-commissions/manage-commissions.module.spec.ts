import { ManageCommissionsModule } from './manage-commissions.module';

describe('ManageCommissionsModule', () => {
  let manageCommissionsModule: ManageCommissionsModule;

  beforeEach(() => {
    manageCommissionsModule = new ManageCommissionsModule();
  });

  it('should create an instance', () => {
    expect(manageCommissionsModule).toBeTruthy();
  });
});
