import { ManageRolesModule } from './manage-roles.module';

describe('ManageRolesModule', () => {
  let manageRolesModule: ManageRolesModule;

  beforeEach(() => {
    manageRolesModule = new ManageRolesModule();
  });

  it('should create an instance', () => {
    expect(manageRolesModule).toBeTruthy();
  });
});
