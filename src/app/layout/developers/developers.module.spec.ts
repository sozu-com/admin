import { DevelopersModule } from './developers.module';

describe('DevelopersModule', () => {
  let developersModule: DevelopersModule;

  beforeEach(() => {
    developersModule = new DevelopersModule();
  });

  it('should create an instance', () => {
    expect(developersModule).toBeTruthy();
  });
});
