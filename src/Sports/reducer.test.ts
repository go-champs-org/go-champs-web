import {
  getSportFailure,
  getSportsFailure,
  getSportsStart,
  getSportsSuccess,
  getSportStart,
  getSportSuccess
} from './actions';
import sportReducer from './reducer';
import { initialState, SportState } from './state';

describe('sportReducer', () => {
  describe('getSport', () => {
    const action = getSportStart();

    it('sets isLoadingRequestSports to true', () => {
      expect(sportReducer(initialState, action).isLoadingRequestSports).toBe(
        true
      );
    });
  });

  describe('getSportFailure', () => {
    const action = getSportFailure('error');

    it('sets isLoadingRequestSports to false', () => {
      expect(sportReducer(initialState, action).isLoadingRequestSports).toBe(
        false
      );
    });
  });

  describe('getSportSuccess', () => {
    const action = getSportSuccess({
      name: 'first-name',
      slug: 'first-slug',
      playerStatistics: [
        {
          name: 'first-stat-name',
          slug: 'first-stat-slug'
        }
      ]
    });

    it('sets isLoadingRequestSports to false', () => {
      expect(sportReducer(initialState, action).isLoadingRequestSports).toBe(
        false
      );
    });

    it('sets entities', () => {
      const newState = sportReducer(initialState, action);

      expect(newState.sports['first-slug']).toEqual({
        name: 'first-name',
        slug: 'first-slug',
        playerStatistics: [
          {
            name: 'first-stat-name',
            slug: 'first-stat-slug'
          }
        ]
      });
    });

    it('keeps others entities in other', () => {
      const someState: SportState = {
        ...initialState,
        sports: {
          ['some-slug']: {
            name: 'some-other-name',
            slug: 'some-other-slug'
          }
        }
      };

      const newState = sportReducer(someState, action);

      expect(newState.sports['some-slug']).toEqual({
        name: 'some-other-name',
        slug: 'some-other-slug'
      });
    });
  });

  describe('getSports', () => {
    const action = getSportsStart();

    it('sets isLoadingRequestSports to true', () => {
      expect(sportReducer(initialState, action).isLoadingRequestSports).toBe(
        true
      );
    });
  });

  describe('getSportsFailure', () => {
    const action = getSportsFailure('error');

    it('sets isLoadingRequestSports to false', () => {
      expect(sportReducer(initialState, action).isLoadingRequestSports).toBe(
        false
      );
    });
  });

  describe('getSportsSuccess', () => {
    const action = getSportsSuccess([
      {
        name: 'first-name',
        slug: 'first-slug',
        playerStatistics: []
      },
      {
        name: 'second-name',
        slug: 'second-slug',
        playerStatistics: []
      }
    ]);

    it('sets isLoadingRequestSports to false', () => {
      expect(sportReducer(initialState, action).isLoadingRequestSports).toBe(
        false
      );
    });

    it('sets entities', () => {
      const newState = sportReducer(initialState, action);

      expect(newState.sports['first-slug']).toEqual({
        name: 'first-name',
        slug: 'first-slug',
        playerStatistics: []
      });
      expect(newState.sports['second-slug']).toEqual({
        name: 'second-name',
        slug: 'second-slug',
        playerStatistics: []
      });
    });
  });
});
