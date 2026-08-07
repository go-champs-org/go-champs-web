import { mapApiPhaseToPhaseEntity } from '@gochamps/api-client';

describe('mapApiPhaseToPhaseEntity', () => {
  it('maps snake_case API phase fields to camelCase entity fields', () => {
    const result = mapApiPhaseToPhaseEntity({
      id: 'ph1',
      title: 'Group Stage',
      type: 'elimination',
      order: 1,
      is_in_progress: true
    });

    expect(result).toEqual({
      id: 'ph1',
      title: 'Group Stage',
      type: 'elimination',
      order: 1,
      isInProgress: true
    });
  });
});
