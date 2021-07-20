import { MarketAnalysisModule } from './market-analysis.module';

describe('MarketAnalysisModule', () => {
  let marketAnalysisModule: MarketAnalysisModule;

  beforeEach(() => {
    marketAnalysisModule = new MarketAnalysisModule();
  });

  it('should create an instance', () => {
    expect(marketAnalysisModule).toBeTruthy();
  });
});
