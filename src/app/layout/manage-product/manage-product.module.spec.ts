import { ManageProductModule } from './manage-product.module';

describe('ManageProductModule', () => {
  let manageProductModule: ManageProductModule;

  beforeEach(() => {
    manageProductModule = new ManageProductModule();
  });

  it('should create an instance', () => {
    expect(manageProductModule).toBeTruthy();
  });
});
