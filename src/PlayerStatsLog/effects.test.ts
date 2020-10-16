import {
  patchPlayerStatsLogs,
  deletePlayerStatsLog,
  postPlayerStatsLogs,
  getPlayerStatsLogsByFilter
} from './effects';
import { DEFAULT_PLAYER_STATS_LOG } from './state';
import {
  getPlayerStatsLogsByFilterFailure,
  getPlayerStatsLogsByFilterStart,
  getPlayerStatsLogsByFilterSuccess,
  postPlayerStatsLogsStart,
  postPlayerStatsLogsSuccess,
  postPlayerStatsLogsFailure,
  patchPlayerStatsLogsStart,
  patchPlayerStatsLogsSuccess,
  patchPlayerStatsLogsFailure,
  deletePlayerStatsLogStart,
  deletePlayerStatsLogSuccess,
  deletePlayerStatsLogFailure
} from './actions';
import playerStatsLogHttpClient from './playerStatsLogHttpClient';
import * as toast from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';

const displayToastSpy = jest.spyOn(toast, 'displayToast');

let dispatch: jest.Mock;

describe('deletePlayerStatsLog', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start delete action', () => {
    deletePlayerStatsLog(DEFAULT_PLAYER_STATS_LOG)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deletePlayerStatsLogStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest
        .spyOn(playerStatsLogHttpClient, 'delete')
        .mockResolvedValue('delete-id');

      deletePlayerStatsLog(DEFAULT_PLAYER_STATS_LOG)(dispatch);
    });

    it('dispatches delete success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        deletePlayerStatsLogSuccess('delete-id')
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest
        .spyOn(playerStatsLogHttpClient, 'delete')
        .mockRejectedValue(apiError);

      deletePlayerStatsLog(DEFAULT_PLAYER_STATS_LOG)(dispatch);
    });

    it('dispatches delete failure action', async () => {
      await deletePlayerStatsLog(DEFAULT_PLAYER_STATS_LOG)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        deletePlayerStatsLogFailure(apiError)
      );
    });
  });
});

describe('getPlayerStatsLogsByFilter', () => {
  const requestFilter = { ['some-key']: 'some value' };
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getPlayerStatsLogsByFilter(requestFilter)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getPlayerStatsLogsByFilterStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest.spyOn(playerStatsLogHttpClient, 'getByFilter').mockResolvedValue([
        {
          gameId: 'game-id',
          id: 'id',
          phaseId: 'phase-id',
          playerId: 'player-id',
          stats: {},
          teamId: 'team-id',
          tournamentId: 'tournament-id'
        }
      ]);

      getPlayerStatsLogsByFilter(requestFilter)(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getPlayerStatsLogsByFilterSuccess([
          {
            gameId: 'game-id',
            id: 'id',
            phaseId: 'phase-id',
            playerId: 'player-id',
            stats: {},
            teamId: 'team-id',
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
        .spyOn(playerStatsLogHttpClient, 'getByFilter')
        .mockRejectedValue(apiError);

      getPlayerStatsLogsByFilter(requestFilter)(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getPlayerStatsLogsByFilter(requestFilter)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        getPlayerStatsLogsByFilterFailure(apiError)
      );
    });
  });
});

describe('patchPlayerStatsLogs', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start patch action', () => {
    patchPlayerStatsLogs([DEFAULT_PLAYER_STATS_LOG])(dispatch);

    expect(dispatch).toHaveBeenCalledWith(patchPlayerStatsLogsStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest.spyOn(playerStatsLogHttpClient, 'patch').mockResolvedValue([
        {
          gameId: 'game-id',
          id: 'patched-id',
          phaseId: 'phase-id',
          playerId: 'player-id',
          stats: {},
          teamId: 'team-id',
          tournamentId: 'tournament-id'
        }
      ]);

      patchPlayerStatsLogs([DEFAULT_PLAYER_STATS_LOG])(dispatch);
    });

    it('dispatches patch success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        patchPlayerStatsLogsSuccess([
          {
            gameId: 'game-id',
            id: 'patched-id',
            phaseId: 'phase-id',
            playerId: 'player-id',
            stats: {},
            teamId: 'team-id',
            tournamentId: 'tournament-id'
          }
        ])
      );
    });

    it('dispatches display toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Player stats logs updated!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { name: ['has invalid format'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest.spyOn(playerStatsLogHttpClient, 'patch').mockRejectedValue(apiError);
    });

    it('dispatches patch failure action', async () => {
      await patchPlayerStatsLogs([DEFAULT_PLAYER_STATS_LOG])(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        patchPlayerStatsLogsFailure(apiError)
      );
    });

    it('returns formatted errors', async () => {
      const result = await patchPlayerStatsLogs([DEFAULT_PLAYER_STATS_LOG])(
        dispatch
      );

      expect(result).toEqual({
        name: ['has invalid format']
      });
    });
  });
});

describe('postPlayerStatsLogs', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start post action', () => {
    postPlayerStatsLogs([DEFAULT_PLAYER_STATS_LOG])(dispatch);

    expect(dispatch).toHaveBeenCalledWith(postPlayerStatsLogsStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(playerStatsLogHttpClient, 'post').mockResolvedValue([
        {
          gameId: 'game-id',
          id: 'patched-id',
          phaseId: 'phase-id',
          playerId: 'player-id',
          stats: {},
          teamId: 'team-id',
          tournamentId: 'tournament-id'
        }
      ]);

      postPlayerStatsLogs([DEFAULT_PLAYER_STATS_LOG])(dispatch);
    });

    it('dispatches post success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        postPlayerStatsLogsSuccess([
          {
            gameId: 'game-id',
            id: 'patched-id',
            phaseId: 'phase-id',
            playerId: 'player-id',
            stats: {},
            teamId: 'team-id',
            tournamentId: 'tournament-id'
          }
        ])
      );
    });

    it('dispatches display toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Player stats logs created!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { name: ['has invalid format'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(playerStatsLogHttpClient, 'post').mockRejectedValue(apiError);
    });

    it('dispatches post failure action', async () => {
      await postPlayerStatsLogs([DEFAULT_PLAYER_STATS_LOG])(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        postPlayerStatsLogsFailure(apiError)
      );
    });

    it('returns formatted errors', async () => {
      const result = await postPlayerStatsLogs([DEFAULT_PLAYER_STATS_LOG])(
        dispatch
      );

      expect(result).toEqual({
        name: ['has invalid format']
      });
    });
  });
});
