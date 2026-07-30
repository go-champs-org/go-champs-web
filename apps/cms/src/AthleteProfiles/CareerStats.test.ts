import { selectCareerStatsViewer } from './CareerStats';
import GeneralCareerStats from './GeneralCareerStats';
import BasketballCareerStats from '../Sports/Basketball5x5/CareerStats';

describe('selectCareerStatsViewer', () => {
  it('returns the basketball_5x5 viewer for basketball_5x5', () => {
    expect(selectCareerStatsViewer('basketball_5x5')).toBe(
      BasketballCareerStats
    );
  });

  it('returns GeneralCareerStats for an unmapped sport slug', () => {
    expect(selectCareerStatsViewer('futsal')).toBe(GeneralCareerStats);
  });

  it('returns GeneralCareerStats for an empty sport slug', () => {
    expect(selectCareerStatsViewer('')).toBe(GeneralCareerStats);
  });
});
