import { HotelCompaniesModule } from './hotel-companies.module';

describe('HotelCompaniesModule', () => {
  let hotelCompaniesModule: HotelCompaniesModule;

  beforeEach(() => {
    hotelCompaniesModule = new HotelCompaniesModule();
  });

  it('should create an instance', () => {
    expect(hotelCompaniesModule).toBeTruthy();
  });
});
