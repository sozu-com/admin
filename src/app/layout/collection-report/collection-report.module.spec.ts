import { CollectionReportModule } from './collection-report.module';

describe('CollectionReportModule', () => {
  let collectionReportModule: CollectionReportModule;

  beforeEach(() => {
    collectionReportModule = new CollectionReportModule();
  });

  it('should create an instance', () => {
    expect(collectionReportModule).toBeTruthy();
  });
});
