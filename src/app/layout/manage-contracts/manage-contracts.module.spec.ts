import { ManageContractsModule } from './manage-contracts.module';

describe('ManageContractsModule', () => {
  let manageContractsModule: ManageContractsModule;

  beforeEach(() => {
    manageContractsModule = new ManageContractsModule();
  });

  it('should create an instance', () => {
    expect(manageContractsModule).toBeTruthy();
  });
});
