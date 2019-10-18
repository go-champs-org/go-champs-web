import {
  deleteDrawFailure,
  deleteDrawStart,
  deleteDrawSuccess,
  patchDrawFailure,
  patchDrawStart,
  patchDrawSuccess,
  postDrawFailure,
  postDrawStart,
  postDrawSuccess
} from './actions';
import drawReducer from './reducer';
import { DrawState, initialState } from './state';

describe('deleteDraw', () => {
  const action = deleteDrawStart();

  it('sets isLoadingDeleteDraw to true', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingDeleteDraw).toBe(true);
  });
});

describe('deleteDrawFailure', () => {
  const action = deleteDrawFailure('error');

  it('sets isLoadingDeleteDraw to false', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingDeleteDraw).toBe(false);
  });
});

describe('deleteDrawSuccess', () => {
  const action = deleteDrawSuccess('first-id');

  const deleteState = {
    ...initialState,
    draws: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        matches: []
      }
    }
  };

  it('sets isLoadingDeleteDraw to false', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingDeleteDraw).toBe(false);
  });

  it('remove entity', () => {
    const newState = drawReducer(deleteState, action);

    expect(newState.draws['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: DrawState = {
      ...initialState,
      draws: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          matches: []
        },
        ...deleteState.draws
      }
    };

    const newState = drawReducer(someState, action);

    expect(newState.draws['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      matches: []
    });
  });
});

describe('patchDraw', () => {
  const action = patchDrawStart();

  it('sets isLoadingPatchDraw to true', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingPatchDraw).toBe(true);
  });
});

describe('patchDrawFailure', () => {
  const action = patchDrawFailure('error');

  it('sets isLoadingPatchDraw to false', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingPatchDraw).toBe(false);
  });
});

describe('patchDrawSuccess', () => {
  const action = patchDrawSuccess({
    id: 'first-id',
    order: 1,
    title: 'some-first-title',
    matches: []
  });

  const updateState: DrawState = {
    ...initialState,
    draws: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        order: 1,
        matches: []
      }
    }
  };

  it('sets isLoadingPatchDraw to false', () => {
    const newState = drawReducer(updateState, action);
    expect(newState.isLoadingPatchDraw).toBe(false);
  });

  it('set entity', () => {
    const newState = drawReducer(updateState, action);

    expect(newState.draws['first-id']).toEqual({
      id: 'first-id',
      title: 'some-first-title',
      order: 1,
      matches: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: DrawState = {
      ...updateState,
      draws: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          matches: []
        }
      }
    };

    const newState = drawReducer(someState, action);

    expect(newState.draws['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      matches: []
    });
  });
});

describe('postDraw', () => {
  const action = postDrawStart();

  it('sets isLoadingPostDraw to true', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingPostDraw).toBe(true);
  });
});

describe('postDrawFailure', () => {
  const action = postDrawFailure('error');

  it('sets isLoadingPostDraw to false', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingPostDraw).toBe(false);
  });
});

describe('postDrawSuccess', () => {
  const action = postDrawSuccess({
    id: 'first-id',
    title: 'first-title',
    order: 1,
    matches: []
  });

  it('sets isLoadingPostDraw to false', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingPostDraw).toBe(false);
  });

  it('set entity', () => {
    const newState = drawReducer(initialState, action);

    expect(newState.draws['first-id']).toEqual({
      id: 'first-id',
      title: 'first-title',
      order: 1,
      matches: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: DrawState = {
      ...initialState,
      draws: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          order: 1,
          matches: []
        }
      }
    };

    const newState = drawReducer(someState, action);

    expect(newState.draws['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      order: 1,
      matches: []
    });
  });
});
