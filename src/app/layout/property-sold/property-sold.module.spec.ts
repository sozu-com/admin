import { PropertySoldModule } from './property-sold.module';

describe('PropertySoldModule', () => {
  let propertySoldModule: PropertySoldModule;

  beforeEach(() => {
    propertySoldModule = new PropertySoldModule();
  });

  it('should create an instance', () => {
    expect(propertySoldModule).toBeTruthy();
  });
});
