import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_PHASE_ROUND,
  DELETE_PHASE_ROUND_FAILURE,
  DELETE_PHASE_ROUND_SUCCESS,
  PATCH_PHASE_ROUND,
  PATCH_PHASE_ROUND_FAILURE,
  PATCH_PHASE_ROUND_SUCCESS,
  POST_PHASE_ROUND,
  POST_PHASE_ROUND_FAILURE,
  POST_PHASE_ROUND_SUCCESS
} from './actions';
import drawReducer from './reducer';
import { DrawEntity, DrawState, initialState } from './state';

describe('deleteDraw', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_PHASE_ROUND,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteDraw to true', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingDeleteDraw).toBe(true);
  });
});

describe('deleteDrawFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_PHASE_ROUND_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteDraw to false', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingDeleteDraw).toBe(false);
  });
});

describe('deleteDrawSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_PHASE_ROUND_SUCCESS,
    payload: 'first-id'
  };

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
  const action: HttpAction<ActionTypes> = {
    type: PATCH_PHASE_ROUND
  };

  it('sets isLoadingPatchDraw to true', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingPatchDraw).toBe(true);
  });
});

describe('patchDrawFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_PHASE_ROUND_FAILURE
  };

  it('sets isLoadingPatchDraw to false', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingPatchDraw).toBe(false);
  });
});

describe('patchDrawSuccess', () => {
  const action: HttpAction<ActionTypes, DrawEntity> = {
    type: PATCH_PHASE_ROUND_SUCCESS,
    payload: {
      id: 'first-id',
      title: 'some-first-title',
      matches: []
    }
  };

  const updateState: DrawState = {
    ...initialState,
    draws: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
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
  const action: HttpAction<ActionTypes> = {
    type: POST_PHASE_ROUND
  };

  it('sets isLoadingPostDraw to true', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingPostDraw).toBe(true);
  });
});

describe('postDrawFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_PHASE_ROUND_FAILURE
  };

  it('sets isLoadingPostDraw to false', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingPostDraw).toBe(false);
  });
});

describe('postDrawSuccess', () => {
  const action: HttpAction<ActionTypes, DrawEntity> = {
    type: POST_PHASE_ROUND_SUCCESS,
    payload: {
      id: 'first-id',
      title: 'first-title',
      matches: []
    }
  };

  it('sets isLoadingPostDraw to false', () => {
    const newState = drawReducer(initialState, action);
    expect(newState.isLoadingPostDraw).toBe(false);
  });

  it('set entity', () => {
    const newState = drawReducer(initialState, action);

    expect(newState.draws['first-id']).toEqual({
      id: 'first-id',
      title: 'first-title',
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
