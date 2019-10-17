import { ApiPhase } from '../../Shared/httpClient/apiTypes';
import { getPhaseSuccess } from '../actions';
import { PhaseTypes } from '../state';
import { default as eliminationStatsReducer } from './reducer';
import { initialState } from './state';

describe('getPhaseSuccess', () => {
  const apiPhase: ApiPhase = {
    id: 'phase-id',
    title: 'phase-title',
    order: 0,
    type: PhaseTypes.elimination,
    elimination_stats: [
      { id: 'first-id', title: 'first-title' },
      { id: 'second-id', title: 'second-title' }
    ]
  };
  const action = getPhaseSuccess(apiPhase);

  it('maps api elimination stats to elimination stats', () => {
    const eliminationStats = eliminationStatsReducer(initialState, action);

    expect(eliminationStats.eliminationStats).toEqual({
      'first-id': {
        id: 'first-id',
        title: 'first-title'
      },
      'second-id': {
        id: 'second-id',
        title: 'second-title'
      }
    });
  });
});
