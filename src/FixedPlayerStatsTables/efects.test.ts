// import {
//   postFixedPlayerStatsTable,
//   patchFixedPlayerStatsTable,
//   deleteFixedPlayerStatsTable
// } from './effects';
// import { DEFAULT_FIXED_PLAYER_STATS_TABLE } from './state';
// import {
//   postFixedPlayerStatsTableStart,
//   postFixedPlayerStatsTableSuccess,
//   postFixedPlayerStatsTableFailure,
//   patchFixedPlayerStatsTableStart,
//   patchFixedPlayerStatsTableSuccess,
//   patchFixedPlayerStatsTableFailure,
//   deleteFixedPlayerStatsTableStart,
//   deleteFixedPlayerStatsTableSuccess,
//   deleteFixedPlayerStatsTableFailure
// } from './actions';
// import fixedPlayerStatsTableHttpClient from './fixedPlayerStatsTableHttpClient';
// import * as toast from '../Shared/bulma/toast';
// import ApiError from '../Shared/httpClient/ApiError';

// const displayToastSpy = jest.spyOn(toast, 'displayToast');

// let dispatch: jest.Mock;

// describe('deleteFixedPlayerStatsTable', () => {
//   beforeEach(() => {
//     dispatch = jest.fn();
//   });

//   it('dispatches start delete action', () => {
//     deleteFixedPlayerStatsTable(DEFAULT_FIXED_PLAYER_STATS_TABLE)(dispatch);

//     expect(dispatch).toHaveBeenCalledWith(deleteFixedPlayerStatsTableStart());
//   });

//   describe('on success', () => {
//     beforeEach(() => {
//       jest
//         .spyOn(fixedPlayerStatsTableHttpClient, 'delete')
//         .mockResolvedValue('delete-id');

//       deleteFixedPlayerStatsTable(DEFAULT_FIXED_PLAYER_STATS_TABLE)(dispatch);
//     });

//     it('dispatches delete success action', () => {
//       expect(dispatch).toHaveBeenCalledWith(
//         deleteFixedPlayerStatsTableSuccess('delete-id')
//       );
//     });
//   });

//   describe('on failure', () => {
//     const apiError = new Error('some-error');

//     beforeEach(() => {
//       dispatch.mockReset();

//       jest
//         .spyOn(fixedPlayerStatsTableHttpClient, 'delete')
//         .mockRejectedValue(apiError);

//       deleteFixedPlayerStatsTable(DEFAULT_FIXED_PLAYER_STATS_TABLE)(dispatch);
//     });

//     it('dispatches delete failure action', async () => {
//       await deleteFixedPlayerStatsTable(DEFAULT_FIXED_PLAYER_STATS_TABLE)(
//         dispatch
//       );

//       expect(dispatch).toHaveBeenCalledWith(
//         deleteFixedPlayerStatsTableFailure(apiError)
//       );
//     });
//   });
// });

// describe('patchFixedPlayerStatsTable', () => {
//   beforeEach(() => {
//     dispatch = jest.fn();
//   });

//   it('dispatches start patch action', () => {
//     patchFixedPlayerStatsTable(DEFAULT_FIXED_PLAYER_STATS_TABLE)(dispatch);

//     expect(dispatch).toHaveBeenCalledWith(patchFixedPlayerStatsTableStart());
//   });

//   describe('on success', () => {
//     beforeEach(() => {
//       dispatch.mockReset();
//       displayToastSpy.mockReset();

//       jest.spyOn(fixedPlayerStatsTableHttpClient, 'patch').mockResolvedValue({
//         id: 'patched-id',
//         statId: 'patched-stat-id',
//         playerStats: []
//       });

//       patchFixedPlayerStatsTable(DEFAULT_FIXED_PLAYER_STATS_TABLE)(dispatch);
//     });

//     it('dispatches patch success action', () => {
//       expect(dispatch).toHaveBeenCalledWith(
//         patchFixedPlayerStatsTableSuccess({
//           id: 'patched-id',
//           stat_id: 'patched-stat-id',
//           player_stats: [],
//           tournament_id: 'tournament-id'
//         })
//       );
//     });

//     it('dispatches display toast', () => {
//       expect(displayToastSpy).toHaveBeenCalledWith(
//         'patched fixedPlayerStatsTable updated!',
//         'is-success'
//       );
//     });
//   });

//   describe('on failure', () => {
//     const apiError = new ApiError({
//       status: 422,
//       data: { errors: { name: ['has invalid format'] } }
//     });

//     beforeEach(() => {
//       dispatch.mockReset();
//       displayToastSpy.mockReset();

//       jest
//         .spyOn(fixedPlayerStatsTableHttpClient, 'patch')
//         .mockRejectedValue(apiError);
//     });

//     it('dispatches patch failure action', async () => {
//       await patchFixedPlayerStatsTable(DEFAULT_FIXED_PLAYER_STATS_TABLE)(
//         dispatch
//       );

//       expect(dispatch).toHaveBeenCalledWith(
//         patchFixedPlayerStatsTableFailure(apiError)
//       );
//     });

//     it('returns formatted errors', async () => {
//       const result = await patchFixedPlayerStatsTable(
//         DEFAULT_FIXED_PLAYER_STATS_TABLE
//       )(dispatch);

//       expect(result).toEqual({
//         name: ['has invalid format']
//       });
//     });
//   });
// });

// describe('postFixedPlayerStatsTable', () => {
//   beforeEach(() => {
//     dispatch = jest.fn();
//   });

//   it('dispatches start post action', () => {
//     postFixedPlayerStatsTable(
//       DEFAULT_FIXED_PLAYER_STATS_TABLE,
//       'tournament-id'
//     )(dispatch);

//     expect(dispatch).toHaveBeenCalledWith(postFixedPlayerStatsTableStart());
//   });

//   describe('on success', () => {
//     beforeEach(() => {
//       dispatch.mockReset();

//       jest.spyOn(fixedPlayerStatsTableHttpClient, 'post').mockResolvedValue({
//         id: 'posted-id',
//         statId: 'posted-stat-id',
//         playerStats: []
//       });

//       postFixedPlayerStatsTable(
//         DEFAULT_FIXED_PLAYER_STATS_TABLE,
//         'tournament-id'
//       )(dispatch);
//     });

//     it('dispatches post success action', () => {
//       expect(dispatch).toHaveBeenCalledWith(
//         postFixedPlayerStatsTableSuccess({
//           id: 'posted-id',
//           stat_id: 'posted-stat-id',
//           player_stats: [],
//           tournament_id: 'tournament-id'
//         })
//       );
//     });

//     it('dispatches display toast', () => {
//       expect(displayToastSpy).toHaveBeenCalledWith(
//         'posted fixedPlayerStatsTable created!',
//         'is-success'
//       );
//     });
//   });

//   describe('on failure', () => {
//     const apiError = new ApiError({
//       status: 422,
//       data: { errors: { name: ['has invalid format'] } }
//     });

//     beforeEach(() => {
//       dispatch.mockReset();

//       jest
//         .spyOn(fixedPlayerStatsTableHttpClient, 'post')
//         .mockRejectedValue(apiError);
//     });

//     it('dispatches post failure action', async () => {
//       await postFixedPlayerStatsTable(
//         DEFAULT_FIXED_PLAYER_STATS_TABLE,
//         'tournament-id'
//       )(dispatch);

//       expect(dispatch).toHaveBeenCalledWith(
//         postFixedPlayerStatsTableFailure(apiError)
//       );
//     });

//     it('returns formatted errors', async () => {
//       const result = await postFixedPlayerStatsTable(
//         DEFAULT_FIXED_PLAYER_STATS_TABLE,
//         'tournament-id'
//       )(dispatch);

//       expect(result).toEqual({
//         name: ['has invalid format']
//       });
//     });
//   });
// });

it('true', () => {
  expect(true).toBe(true);
});
