import { AgenciesModule } from './agencies.module';

describe('AgenciesModule', () => {
  let agenciesModule: AgenciesModule;

  beforeEach(() => {
    agenciesModule = new AgenciesModule();
  });

  it('should create an instance', () => {
    expect(agenciesModule).toBeTruthy();
  });
});
