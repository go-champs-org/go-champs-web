import {
  postTournament,
  patchTournament,
  getTournament,
  getTournamentsByFilter,
  deleteTournament,
  getTournamentBySlug
} from './effects';
import * as fixedPlayerStatsTablesEffects from '../FixedPlayerStatsTables/effects';
import { DEFAULT_TOURNAMENT } from './state';
import {
  postTournamentStart,
  postTournamentSuccess,
  postTournamentFailure,
  patchTournamentStart,
  patchTournamentSuccess,
  patchTournamentFailure,
  getTournamentStart,
  getTournamentSuccess,
  getTournamentFailure,
  getTournamentsByFilterFailure,
  getTournamentsByFilterSuccess,
  getTournamentsByFilterStart,
  deleteTournamentStart,
  deleteTournamentSuccess,
  deleteTournamentFailure
} from './actions';
import tournamentHttpClient from './tournamentHttpClient';
import * as toast from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';

jest.spyOn(toast, 'displayToast');
jest.spyOn(fixedPlayerStatsTablesEffects, 'getFixedPlayerStatsTablesByFilter');

let dispatch: jest.Mock;

describe('deleteTournament', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start delete action', () => {
    deleteTournament(DEFAULT_TOURNAMENT)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteTournamentStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest.spyOn(tournamentHttpClient, 'delete').mockResolvedValue('delete-id');

      deleteTournament(DEFAULT_TOURNAMENT)(dispatch);
    });

    it('dispatches delete success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        deleteTournamentSuccess('delete-id')
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(tournamentHttpClient, 'delete').mockRejectedValue(apiError);

      deleteTournament(DEFAULT_TOURNAMENT)(dispatch);
    });

    it('dispatches delete failure action', async () => {
      await deleteTournament(DEFAULT_TOURNAMENT)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(deleteTournamentFailure(apiError));
    });
  });
});

describe('getTournament', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getTournament('some-id')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getTournamentStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest.spyOn(tournamentHttpClient, 'get').mockResolvedValue({
        id: 'get-id',
        name: 'get tournament',
        slug: 'get-tournament-slug',
        organization: {
          id: 'organization-id',
          name: 'organization name',
          slug: 'organization-slug'
        },
        phases: [],
        teams: []
      });

      getTournament('some-id')(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getTournamentSuccess({
          id: 'get-id',
          name: 'get tournament',
          slug: 'get-tournament-slug',
          organization: {
            id: 'organization-id',
            name: 'organization name',
            slug: 'organization-slug'
          },
          phases: [],
          teams: []
        })
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(tournamentHttpClient, 'get').mockRejectedValue(apiError);

      getTournament('some-id')(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getTournament('some-id')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(getTournamentFailure(apiError));
    });
  });
});

describe('getTournamentBySlug', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getTournamentBySlug(
      'some-organization-slug',
      'some-tournament-slug'
    )(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getTournamentStart());
  });

  describe('on success', () => {
    beforeEach(async () => {
      jest.spyOn(tournamentHttpClient, 'getByFilter').mockResolvedValue([
        {
          id: 'get-id',
          name: 'get tournament',
          slug: 'get-tournament-slug'
        }
      ]);
      jest.spyOn(tournamentHttpClient, 'get').mockResolvedValue({
        id: 'get-id',
        name: 'get tournament',
        slug: 'get-tournament-slug',
        organization: {
          id: 'organization-id',
          name: 'organization name',
          slug: 'organization-slug'
        },
        phases: [],
        teams: []
      });

      dispatch = jest.fn();

      await getTournamentBySlug(
        'some-organization-slug',
        'some-tournament-slug'
      )(dispatch);
    });

    it('dispatches get fixed player stats tables action', () => {
      expect(
        fixedPlayerStatsTablesEffects.getFixedPlayerStatsTablesByFilter
      ).toHaveBeenCalledWith({ tournament_id: 'get-id' });
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getTournamentSuccess({
          id: 'get-id',
          name: 'get tournament',
          slug: 'get-tournament-slug',
          organization: {
            id: 'organization-id',
            name: 'organization name',
            slug: 'organization-slug'
          },
          phases: [],
          teams: []
        })
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(tournamentHttpClient, 'get').mockRejectedValue(apiError);

      getTournamentBySlug(
        'some-organization-slug',
        'some-tournament-slug'
      )(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getTournament('some-id')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(getTournamentFailure(apiError));
    });
  });
});

describe('getTournamentsByFilter', () => {
  const requestFilter = { ['some-key']: 'some value' };
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getTournamentsByFilter(requestFilter)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getTournamentsByFilterStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest.spyOn(tournamentHttpClient, 'getByFilter').mockResolvedValue([
        {
          id: 'get-id',
          name: 'get tournament',
          slug: 'get-tournament-slug'
        }
      ]);

      getTournamentsByFilter(requestFilter)(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getTournamentsByFilterSuccess([
          {
            id: 'get-id',
            name: 'get tournament',
            slug: 'get-tournament-slug'
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
        .spyOn(tournamentHttpClient, 'getByFilter')
        .mockRejectedValue(apiError);

      getTournamentsByFilter(requestFilter)(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getTournamentsByFilter(requestFilter)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        getTournamentsByFilterFailure(apiError)
      );
    });
  });
});

describe('patchTournament', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start patch action', () => {
    patchTournament('organization-id', DEFAULT_TOURNAMENT)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(patchTournamentStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(tournamentHttpClient, 'patch').mockResolvedValue({
        id: 'patched-id',
        name: 'patched tournament',
        slug: 'patched-tournament-slug',
        organization: {
          id: 'organization-id',
          name: 'organization name',
          slug: 'organization-slug'
        },
        phases: [],
        teams: []
      });

      patchTournament('organization-id', DEFAULT_TOURNAMENT)(dispatch);
    });

    it('dispatches patch success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        patchTournamentSuccess({
          id: 'patched-id',
          name: 'patched tournament',
          slug: 'patched-tournament-slug',
          organization: {
            id: 'organization-id',
            name: 'organization name',
            slug: 'organization-slug'
          },
          phases: [],
          teams: []
        })
      );
    });

    it('dispatches display toast', () => {
      expect(toast.displayToast).toHaveBeenCalledWith(
        'patched tournament updated!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { slug: ['has invalid format'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(tournamentHttpClient, 'patch').mockRejectedValue(apiError);
    });

    it('dispatches patch failure action', async () => {
      await patchTournament('organization-id', DEFAULT_TOURNAMENT)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(patchTournamentFailure(apiError));
    });

    it('returns formatted errors', async () => {
      const result = await patchTournament(
        'organization-id',
        DEFAULT_TOURNAMENT
      )(dispatch);

      expect(result).toEqual({
        slug: ['has invalid format']
      });
    });
  });
});

describe('postTournament', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start post action', () => {
    postTournament('organization-id', DEFAULT_TOURNAMENT)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(postTournamentStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(tournamentHttpClient, 'post').mockResolvedValue({
        id: 'posted-id',
        name: 'posted tournament',
        slug: 'posted-tournament-slug',
        organization: {
          id: 'organization-id',
          name: 'organization name',
          slug: 'organization-slug'
        },
        phases: [],
        teams: []
      });

      postTournament('organization-id', DEFAULT_TOURNAMENT)(dispatch);
    });

    it('dispatches post success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        postTournamentSuccess({
          id: 'posted-id',
          name: 'posted tournament',
          slug: 'posted-tournament-slug',
          organization: {
            id: 'organization-id',
            name: 'organization name',
            slug: 'organization-slug'
          },
          phases: [],
          teams: []
        })
      );
    });

    it('dispatches display toast', () => {
      expect(toast.displayToast).toHaveBeenCalledWith(
        'posted tournament created!',
        'is-success'
      );
    });
  });

  describe('on failure', () => {
    const apiError = new ApiError({
      status: 422,
      data: { errors: { slug: ['has invalid format'] } }
    });

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(tournamentHttpClient, 'post').mockRejectedValue(apiError);
    });

    it('dispatches post failure action', async () => {
      await postTournament('organization-id', DEFAULT_TOURNAMENT)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(postTournamentFailure(apiError));
    });

    it('returns formatted errors', async () => {
      const result = await postTournament(
        'organization-id',
        DEFAULT_TOURNAMENT
      )(dispatch);

      expect(result).toEqual({
        slug: ['has invalid format']
      });
    });
  });
});
