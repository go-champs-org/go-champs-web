import {
  postTournament,
  patchTournament,
  getTournament,
  getTournamentsByFilter,
  deleteTournament,
  getTournamentBySlug,
  getAdminTournaments,
  patchTournamentArchive
} from './effects';
import * as fixedPlayerStatsTablesEffects from '../FixedPlayerStatsTables/effects';
import * as recentlyViewsEffects from '../RecentlyViews/effects';
import * as sportEffects from '../Sports/effects';
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
  deleteTournamentFailure,
  getAdminTournamentsStart,
  getAdminTournamentsSuccess,
  getAdminTournamentsFailure,
  patchTournamentArchiveStart,
  patchTournamentArchiveSuccess,
  patchTournamentArchiveFailure
} from './actions';
import tournamentHttpClient from './tournamentHttpClient';
import * as toast from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';
import { History } from 'history';
import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';

const mockHistory = ({
  push: jest.fn()
} as unknown) as History;

jest.spyOn(fixedPlayerStatsTablesEffects, 'getFixedPlayerStatsTablesByFilter');
jest.spyOn(recentlyViewsEffects, 'postRecentlyView');
jest.spyOn(sportEffects, 'getSport');
jest.spyOn(toast, 'displayToast');

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
      jest.spyOn(tournamentHttpClient, 'get').mockResolvedValue(({
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
      } as unknown) as ApiTournamentWithDependecies);

      getTournament('some-id')(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getTournamentSuccess(({
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
        } as unknown) as ApiTournamentWithDependecies)
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
          slug: 'get-tournament-slug',
          visibility: 'public'
        }
      ]);
      jest.spyOn(tournamentHttpClient, 'get').mockResolvedValue(({
        id: 'get-id',
        name: 'get tournament',
        slug: 'get-tournament-slug',
        organization: {
          id: 'organization-id',
          name: 'organization name',
          slug: 'organization-slug'
        },
        phases: [],
        teams: [],
        sport_slug: 'some-sport-slug'
      } as unknown) as ApiTournamentWithDependecies);

      dispatch = jest.fn();

      await getTournamentBySlug(
        'some-organization-slug',
        'some-tournament-slug'
      )(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getTournamentSuccess(({
          id: 'get-id',
          name: 'get tournament',
          slug: 'get-tournament-slug',
          organization: {
            id: 'organization-id',
            name: 'organization name',
            slug: 'organization-slug'
          },
          phases: [],
          teams: [],
          sport_slug: 'some-sport-slug'
        } as unknown) as ApiTournamentWithDependecies)
      );
    });

    it('dispatches post recently view action', () => {
      expect(recentlyViewsEffects.postRecentlyView).toHaveBeenCalledWith(
        'get-id'
      );
    });

    it('dispatches get fixed player stats tables action', () => {
      expect(
        fixedPlayerStatsTablesEffects.getFixedPlayerStatsTablesByFilter
      ).toHaveBeenCalledWith({ tournament_id: 'get-id' });
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
          slug: 'get-tournament-slug',
          visibility: 'public'
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
            slug: 'get-tournament-slug',
            visibility: 'public'
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

      jest.spyOn(tournamentHttpClient, 'patch').mockResolvedValue(({
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
      } as unknown) as ApiTournamentWithDependecies);

      patchTournament('organization-id', DEFAULT_TOURNAMENT)(dispatch);
    });

    it('dispatches patch success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        patchTournamentSuccess(({
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
        } as unknown) as ApiTournamentWithDependecies)
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
    postTournament(
      'organization-id',
      DEFAULT_TOURNAMENT,
      mockHistory
    )(dispatch);

    expect(dispatch).toHaveBeenCalledWith(postTournamentStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(tournamentHttpClient, 'post').mockResolvedValue(({
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
      } as unknown) as ApiTournamentWithDependecies);

      postTournament(
        'organization-id',
        DEFAULT_TOURNAMENT,
        mockHistory
      )(dispatch);
    });

    it('dispatches post success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        postTournamentSuccess(({
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
        } as unknown) as ApiTournamentWithDependecies)
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
      await postTournament(
        'organization-id',
        DEFAULT_TOURNAMENT,
        mockHistory
      )(dispatch);

      expect(dispatch).toHaveBeenCalledWith(postTournamentFailure(apiError));
    });

    it('returns formatted errors', async () => {
      const result = await postTournament(
        'organization-id',
        DEFAULT_TOURNAMENT,
        mockHistory
      )(dispatch);

      expect(result).toEqual({
        slug: ['has invalid format']
      });
    });
  });
});

describe('getAdminTournaments', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start action', () => {
    getAdminTournaments('some-organization-id', false)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getAdminTournamentsStart());
  });

  describe('on success', () => {
    const apiAdminTournaments = [
      {
        id: 'some-id',
        name: 'some-name',
        slug: 'some-slug',
        archived_at: null
      }
    ];

    beforeEach(() => {
      jest
        .spyOn(tournamentHttpClient, 'getAdminByOrganization')
        .mockResolvedValue(apiAdminTournaments);
    });

    it('requests the selected archive state', async () => {
      await getAdminTournaments('some-organization-id', true)(dispatch);

      expect(tournamentHttpClient.getAdminByOrganization).toHaveBeenCalledWith(
        'some-organization-id',
        true
      );
    });

    it('dispatches success action', async () => {
      await getAdminTournaments('some-organization-id', false)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        getAdminTournamentsSuccess(apiAdminTournaments)
      );
    });
  });

  describe('on failure', () => {
    beforeEach(() => {
      jest
        .spyOn(tournamentHttpClient, 'getAdminByOrganization')
        .mockRejectedValue(new Error('some-error'));
    });

    it('dispatches failure action', async () => {
      await getAdminTournaments('some-organization-id', false)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        getAdminTournamentsFailure(new Error('some-error'))
      );
    });
  });
});

describe('patchTournamentArchive', () => {
  const apiArchive = {
    tournament_id: 'some-id',
    archived_at: '2026-08-22T00:00:00Z'
  };

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start action', () => {
    jest.spyOn(tournamentHttpClient, 'archive').mockResolvedValue(apiArchive);

    patchTournamentArchive(
      DEFAULT_TOURNAMENT,
      'some-organization-id',
      true
    )(dispatch);

    expect(dispatch).toHaveBeenCalledWith(patchTournamentArchiveStart());
  });

  describe('when archiving', () => {
    beforeEach(() => {
      jest.spyOn(tournamentHttpClient, 'archive').mockResolvedValue(apiArchive);
      jest
        .spyOn(tournamentHttpClient, 'getAdminByOrganization')
        .mockResolvedValue([]);
    });

    it('dispatches success action', async () => {
      await patchTournamentArchive(
        DEFAULT_TOURNAMENT,
        'some-organization-id',
        true
      )(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        patchTournamentArchiveSuccess(apiArchive)
      );
    });

    it('refetches the active listing', async () => {
      await patchTournamentArchive(
        DEFAULT_TOURNAMENT,
        'some-organization-id',
        true
      )(dispatch);

      expect(tournamentHttpClient.getAdminByOrganization).toHaveBeenCalledWith(
        'some-organization-id',
        false
      );
    });
  });

  describe('when unarchiving', () => {
    beforeEach(() => {
      jest
        .spyOn(tournamentHttpClient, 'unarchive')
        .mockResolvedValue({ ...apiArchive, archived_at: null });
      jest
        .spyOn(tournamentHttpClient, 'getAdminByOrganization')
        .mockResolvedValue([]);
    });

    it('calls the unarchive endpoint', async () => {
      await patchTournamentArchive(
        DEFAULT_TOURNAMENT,
        'some-organization-id',
        false
      )(dispatch);

      expect(tournamentHttpClient.unarchive).toHaveBeenCalledWith(
        DEFAULT_TOURNAMENT.id
      );
    });

    it('refetches the archived listing', async () => {
      await patchTournamentArchive(
        DEFAULT_TOURNAMENT,
        'some-organization-id',
        false
      )(dispatch);

      expect(tournamentHttpClient.getAdminByOrganization).toHaveBeenCalledWith(
        'some-organization-id',
        true
      );
    });
  });

  describe('on failure', () => {
    beforeEach(() => {
      jest
        .spyOn(tournamentHttpClient, 'archive')
        .mockRejectedValue(new Error('some-error'));
    });

    it('dispatches failure action and displays an error toast', async () => {
      await patchTournamentArchive(
        DEFAULT_TOURNAMENT,
        'some-organization-id',
        true
      )(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        patchTournamentArchiveFailure(new Error('some-error'))
      );
      expect(toast.displayToast).toHaveBeenCalledWith(
        `Could not archive ${DEFAULT_TOURNAMENT.name}`,
        'is-danger'
      );
    });
  });
});
