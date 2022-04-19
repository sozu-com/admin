import { OutsidePropertySoldModule } from './outside-property-sold.module';

describe('OutsidePropertySoldModule', () => {
  let outsidePropertySoldModule: OutsidePropertySoldModule;

  beforeEach(() => {
    outsidePropertySoldModule = new OutsidePropertySoldModule();
  });

  it('should create an instance', () => {
    expect(outsidePropertySoldModule).toBeTruthy();
  });
});
