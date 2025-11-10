import {
  deleteGame,
  getGame,
  getGamesByFilter,
  migrateGameToNewPhase,
  patchGame,
  postGame
} from './effects';
import { GameEntity } from './state';
import {
  deleteGameFailure,
  deleteGameStart,
  deleteGameSuccess,
  getGameFailure,
  getGamesByFilterFailure,
  getGamesByFilterStart,
  getGamesByFilterSuccess,
  getGameStart,
  getGameSuccess,
  patchGameFailure,
  patchGameStart,
  patchGameSuccess,
  postGameFailure,
  postGameStart,
  postGameSuccess
} from './actions';
import gameHttpClient from './gameHttpClient';
import * as toast from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';

const displayToastSpy = jest.spyOn(toast, 'displayToast');

let dispatch: jest.Mock;

const DEFAULT_GAME: GameEntity = {
  id: 'game-id',
  awayPlaceholder: 'Away Placeholder',
  awayScore: 0,
  awayTeam: {
    id: 'away-team-id',
    name: 'Away Team',
    logoUrl: '',
    triCode: 'AWY',
    coaches: []
  },
  datetime: '2023-01-01T00:00:00Z',
  homePlaceholder: 'Home Placeholder',
  homeScore: 0,
  homeTeam: {
    id: 'home-team-id',
    name: 'Home Team',
    logoUrl: '',
    triCode: 'HOM',
    coaches: []
  },
  info: 'Game info',
  isFinished: false,
  location: 'Game Location',
  phaseId: 'phase-id',
  liveState: 'not_started',
  youTubeCode: ''
};

describe('deleteGame', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start delete action', () => {
    deleteGame(DEFAULT_GAME)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteGameStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      displayToastSpy.mockReset();

      jest.spyOn(gameHttpClient, 'delete').mockResolvedValue('delete-id');

      deleteGame(DEFAULT_GAME)(dispatch);
    });

    it('dispatches delete success action', () => {
      expect(dispatch).toHaveBeenCalledWith(deleteGameSuccess('delete-id'));
    });

    it('displays success toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Game deleted!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(gameHttpClient, 'delete').mockRejectedValue(apiError);

      deleteGame(DEFAULT_GAME)(dispatch);
    });

    it('dispatches delete failure action', async () => {
      await deleteGame(DEFAULT_GAME)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(deleteGameFailure(apiError));
    });
  });
});

describe('getGame', () => {
  const gameId = 'game-id';

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getGame(gameId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getGameStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest.spyOn(gameHttpClient, 'get').mockResolvedValue(DEFAULT_GAME);

      getGame(gameId)(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(getGameSuccess(DEFAULT_GAME));
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(gameHttpClient, 'get').mockRejectedValue(apiError);

      getGame(gameId)(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getGame(gameId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(getGameFailure(apiError));
    });
  });
});

describe('getGamesByFilter', () => {
  const requestFilter = { 'some-key': 'some value' };

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getGamesByFilter(requestFilter)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getGamesByFilterStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest
        .spyOn(gameHttpClient, 'getByFilter')
        .mockResolvedValue([DEFAULT_GAME]);

      getGamesByFilter(requestFilter)(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getGamesByFilterSuccess([DEFAULT_GAME])
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(gameHttpClient, 'getByFilter').mockRejectedValue(apiError);

      getGamesByFilter(requestFilter)(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getGamesByFilter(requestFilter)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(getGamesByFilterFailure(apiError));
    });
  });
});

describe('migrateGameToNewPhase', () => {
  const gameId = 'game-id';
  const newPhaseId = 'new-phase-id';

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start patch action', () => {
    migrateGameToNewPhase(gameId, newPhaseId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(patchGameStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest
        .spyOn(gameHttpClient, 'migrateToNewPhase')
        .mockResolvedValue(DEFAULT_GAME);

      migrateGameToNewPhase(gameId, newPhaseId)(dispatch);
    });

    it('dispatches patch success action', () => {
      expect(dispatch).toHaveBeenCalledWith(patchGameSuccess(DEFAULT_GAME));
    });

    it('displays success toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Game migrated to new phase!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { phaseId: ['is invalid'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest
        .spyOn(gameHttpClient, 'migrateToNewPhase')
        .mockRejectedValue(apiError);
    });

    it('dispatches patch failure action', async () => {
      await migrateGameToNewPhase(gameId, newPhaseId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(patchGameFailure(apiError));
    });
  });
});

describe('patchGame', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start patch action', () => {
    patchGame(DEFAULT_GAME)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(patchGameStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest.spyOn(gameHttpClient, 'patch').mockResolvedValue(DEFAULT_GAME);

      patchGame(DEFAULT_GAME)(dispatch);
    });

    it('dispatches patch success action', () => {
      expect(dispatch).toHaveBeenCalledWith(patchGameSuccess(DEFAULT_GAME));
    });

    it('displays success toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Game updated!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { datetime: ['has invalid format'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest.spyOn(gameHttpClient, 'patch').mockRejectedValue(apiError);
    });

    it('dispatches patch failure action', async () => {
      await patchGame(DEFAULT_GAME)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(patchGameFailure(apiError));
    });
  });
});

describe('postGame', () => {
  const phaseId = 'phase-id';

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start post action', () => {
    postGame(DEFAULT_GAME, phaseId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(postGameStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest.spyOn(gameHttpClient, 'post').mockResolvedValue(DEFAULT_GAME);

      postGame(DEFAULT_GAME, phaseId)(dispatch);
    });

    it('dispatches post success action', () => {
      expect(dispatch).toHaveBeenCalledWith(postGameSuccess(DEFAULT_GAME));
    });

    it('displays success toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Game created!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { homeTeam: ['is required'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();
      displayToastSpy.mockReset();

      jest.spyOn(gameHttpClient, 'post').mockRejectedValue(apiError);
    });

    it('dispatches post failure action', async () => {
      await postGame(DEFAULT_GAME, phaseId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(postGameFailure(apiError));
    });
  });
});
