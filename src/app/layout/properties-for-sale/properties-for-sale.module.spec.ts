import { PropertiesForSaleModule } from './properties-for-sale.module';

describe('PropertiesForSaleModule', () => {
  let propertiesForSaleModule: PropertiesForSaleModule;

  beforeEach(() => {
    propertiesForSaleModule = new PropertiesForSaleModule();
  });

  it('should create an instance', () => {
    expect(propertiesForSaleModule).toBeTruthy();
  });
});
