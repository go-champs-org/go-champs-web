import { getTeamStatsLogsByFilter } from './effects';
import {
  getTeamStatsLogsByFilterFailure,
  getTeamStatsLogsByFilterStart,
  getTeamStatsLogsByFilterSuccess
} from './actions';
import teamStatsLogHttpClient from './teamStatsLogHttpClient';
import * as toast from '../Shared/bulma/toast';

const displayToastSpy = jest.spyOn(toast, 'displayToast');

let dispatch: jest.Mock;

describe('getTeamStatsLogsByFilter', () => {
  const requestFilter = { 'some-key': 'some value' };
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getTeamStatsLogsByFilter(requestFilter)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getTeamStatsLogsByFilterStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest.spyOn(teamStatsLogHttpClient, 'getByFilter').mockResolvedValue([
        {
          gameId: 'game-id',
          id: 'id',
          phaseId: 'phase-id',
          teamId: 'team-id',
          stats: {},
          againstTeamId: 'team-id',
          tournamentId: 'tournament-id'
        }
      ]);

      getTeamStatsLogsByFilter(requestFilter)(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getTeamStatsLogsByFilterSuccess([
          {
            gameId: 'game-id',
            id: 'id',
            phaseId: 'phase-id',
            teamId: 'team-id',
            stats: {},
            againstTeamId: 'team-id',
            tournamentId: 'tournament-id'
          }
        ])
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest
        .spyOn(teamStatsLogHttpClient, 'getByFilter')
        .mockRejectedValue(apiError);

      getTeamStatsLogsByFilter(requestFilter)(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getTeamStatsLogsByFilter(requestFilter)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        getTeamStatsLogsByFilterFailure(apiError)
      );
    });
  });
});
