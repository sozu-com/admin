import { LegalEntityModule } from './legal-entity.module';

describe('LegalEntityModule', () => {
  let legalEntityModule: LegalEntityModule;

  beforeEach(() => {
    legalEntityModule = new LegalEntityModule();
  });

  it('should create an instance', () => {
    expect(legalEntityModule).toBeTruthy();
  });
});
