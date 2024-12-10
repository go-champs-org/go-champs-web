import {
  getSportStart,
  getSportFailure,
  getSportSuccess,
  getSportsFailure,
  getSportsStart,
  getSportsSuccess
} from './actions';
import sportReducer from './reducer';
import { initialState } from './state';

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
      name: 'name',
      slug: 'slug',
      playerStatistics: []
    });

    it('sets isLoadingRequestSports to false', () => {
      expect(sportReducer(initialState, action).isLoadingRequestSports).toBe(
        false
      );
    });

    it('sets entities', () => {
      const newState = sportReducer(initialState, action);

      expect(newState.sports['slug']).toEqual({
        name: 'name',
        slug: 'slug',
        playerStatistics: []
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
