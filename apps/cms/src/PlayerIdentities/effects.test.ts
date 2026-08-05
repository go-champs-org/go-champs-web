import { History } from 'history';
import * as toast from '../Shared/bulma/toast';
import ApiError from '../Shared/httpClient/ApiError';
import {
  deletePlayerIdentityFailure,
  deletePlayerIdentityStart,
  deletePlayerIdentitySuccess,
  postPlayerIdentityFailure,
  postPlayerIdentityStart,
  postPlayerIdentitySuccess,
  putPlayerIdentityFailure,
  putPlayerIdentityStart,
  putPlayerIdentitySuccess,
  requestPlayerIdentityFailure,
  requestPlayerIdentityNotFound,
  requestPlayerIdentityStart,
  requestPlayerIdentitySuccess
} from './actions';
import { PlayerIdentityFormValues } from './dataMappers';
import {
  deletePlayerIdentity,
  requestPlayerIdentity,
  savePlayerIdentity
} from './effects';
import playerIdentityHttpClient from './playerIdentityHttpClient';
import { PlayerIdentityEntity } from './state';

const displayToastSpy = jest.spyOn(toast, 'displayToast');

const history = ({ push: jest.fn() } as unknown) as History;

let dispatch: jest.Mock;

const formValues: PlayerIdentityFormValues = {
  fullLegalName: 'Jane Doe',
  taxId: '52998224725',
  governmentId: '123456',
  dateOfBirth: '1990-01-01',
  username: 'janedoe',
  email: 'jane@example.com'
};

const apiPlayerIdentity = {
  full_legal_name: 'Jane Doe',
  tax_id_type: 'CPF',
  tax_id_last4: '4725',
  government_id_type: 'RG',
  government_id_last4: '3456',
  date_of_birth: '1990-01-01',
  username: 'janedoe',
  email: 'jane@example.com'
};

const mappedPlayerIdentity: PlayerIdentityEntity = {
  playerId: 'player-1',
  exists: true,
  fullLegalName: 'Jane Doe',
  taxIdType: 'CPF',
  taxIdLast4: '4725',
  governmentIdType: 'RG',
  governmentIdLast4: '3456',
  dateOfBirth: '1990-01-01',
  username: 'janedoe',
  email: 'jane@example.com'
};

beforeEach(() => {
  dispatch = jest.fn();
  displayToastSpy.mockReset();
  (history.push as jest.Mock).mockReset();
});

describe('requestPlayerIdentity', () => {
  it('dispatches start action', () => {
    jest
      .spyOn(playerIdentityHttpClient, 'get')
      .mockResolvedValue({ data: apiPlayerIdentity } as never);

    requestPlayerIdentity('player-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(requestPlayerIdentityStart());
  });

  describe('on success', () => {
    beforeEach(async () => {
      jest
        .spyOn(playerIdentityHttpClient, 'get')
        .mockResolvedValue({ data: apiPlayerIdentity } as never);

      await requestPlayerIdentity('player-1')(dispatch);
    });

    it('dispatches request success action with the mapped entity', () => {
      expect(dispatch).toHaveBeenCalledWith(
        requestPlayerIdentitySuccess(mappedPlayerIdentity)
      );
    });
  });

  describe('when there is no identity yet', () => {
    beforeEach(async () => {
      jest
        .spyOn(playerIdentityHttpClient, 'get')
        .mockResolvedValue({} as never);

      await requestPlayerIdentity('player-1')(dispatch);
    });

    it('dispatches not found instead of an error', () => {
      expect(dispatch).toHaveBeenCalledWith(
        requestPlayerIdentityNotFound('player-1')
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('network error');

    beforeEach(async () => {
      jest.spyOn(playerIdentityHttpClient, 'get').mockRejectedValue(apiError);

      await requestPlayerIdentity('player-1')(dispatch);
    });

    it('dispatches request failure action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        requestPlayerIdentityFailure(apiError)
      );
    });
  });
});

describe('savePlayerIdentity', () => {
  describe('when the identity does not exist yet', () => {
    it('dispatches post start action', () => {
      jest
        .spyOn(playerIdentityHttpClient, 'post')
        .mockResolvedValue({ data: apiPlayerIdentity } as never);

      savePlayerIdentity(
        'player-1',
        false,
        formValues,
        { fullLegalName: true },
        history,
        '/back'
      )(dispatch);

      expect(dispatch).toHaveBeenCalledWith(postPlayerIdentityStart());
    });

    describe('on success', () => {
      beforeEach(async () => {
        jest
          .spyOn(playerIdentityHttpClient, 'post')
          .mockResolvedValue({ data: apiPlayerIdentity } as never);

        await savePlayerIdentity(
          'player-1',
          false,
          formValues,
          { fullLegalName: true },
          history,
          '/back'
        )(dispatch);
      });

      it('dispatches post success action with the mapped entity', () => {
        expect(dispatch).toHaveBeenCalledWith(
          postPlayerIdentitySuccess(mappedPlayerIdentity)
        );
      });

      it('displays a success toast', () => {
        expect(displayToastSpy).toHaveBeenCalledWith(
          'Player identity saved!',
          'is-success'
        );
      });

      it('navigates back', () => {
        expect(history.push).toHaveBeenCalledWith('/back');
      });
    });

    describe('on failure', () => {
      const apiError = new ApiError({
        status: 422,
        data: { errors: { tax_id: ['is invalid'] } }
      });

      beforeEach(() => {
        jest
          .spyOn(playerIdentityHttpClient, 'post')
          .mockRejectedValue(apiError);
      });

      it('dispatches post failure action', async () => {
        await savePlayerIdentity(
          'player-1',
          false,
          formValues,
          { fullLegalName: true },
          history,
          '/back'
        )(dispatch);

        expect(dispatch).toHaveBeenCalledWith(
          postPlayerIdentityFailure(apiError)
        );
      });

      it('returns formatted errors', async () => {
        const result = await savePlayerIdentity(
          'player-1',
          false,
          formValues,
          { fullLegalName: true },
          history,
          '/back'
        )(dispatch);

        expect(result).toEqual({ tax_id: ['is invalid'] });
      });
    });
  });

  describe('when the identity already exists', () => {
    it('dispatches put start action', () => {
      jest
        .spyOn(playerIdentityHttpClient, 'put')
        .mockResolvedValue({ data: apiPlayerIdentity } as never);

      savePlayerIdentity(
        'player-1',
        true,
        formValues,
        { fullLegalName: true },
        history,
        '/back'
      )(dispatch);

      expect(dispatch).toHaveBeenCalledWith(putPlayerIdentityStart());
    });

    describe('on success', () => {
      beforeEach(async () => {
        jest
          .spyOn(playerIdentityHttpClient, 'put')
          .mockResolvedValue({ data: apiPlayerIdentity } as never);

        await savePlayerIdentity(
          'player-1',
          true,
          formValues,
          { fullLegalName: true },
          history,
          '/back'
        )(dispatch);
      });

      it('dispatches put success action with the mapped entity', () => {
        expect(dispatch).toHaveBeenCalledWith(
          putPlayerIdentitySuccess(mappedPlayerIdentity)
        );
      });

      it('navigates back', () => {
        expect(history.push).toHaveBeenCalledWith('/back');
      });
    });

    describe('on failure', () => {
      const apiError = new ApiError({
        status: 422,
        data: { errors: { tax_id: ['is invalid'] } }
      });

      it('dispatches put failure action', async () => {
        jest
          .spyOn(playerIdentityHttpClient, 'put')
          .mockRejectedValue(apiError);

        await savePlayerIdentity(
          'player-1',
          true,
          formValues,
          { fullLegalName: true },
          history,
          '/back'
        )(dispatch);

        expect(dispatch).toHaveBeenCalledWith(
          putPlayerIdentityFailure(apiError)
        );
      });
    });
  });
});

describe('deletePlayerIdentity', () => {
  it('dispatches start action', () => {
    jest
      .spyOn(playerIdentityHttpClient, 'delete')
      .mockResolvedValue('player-1' as never);

    deletePlayerIdentity('player-1', history, '/back')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deletePlayerIdentityStart());
  });

  describe('on success', () => {
    beforeEach(async () => {
      jest
        .spyOn(playerIdentityHttpClient, 'delete')
        .mockResolvedValue('player-1' as never);

      await deletePlayerIdentity('player-1', history, '/back')(dispatch);
    });

    it('dispatches delete success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        deletePlayerIdentitySuccess('player-1')
      );
    });

    it('displays a success toast', () => {
      expect(displayToastSpy).toHaveBeenCalledWith(
        'Player identity removed!',
        'is-success'
      );
    });

    it('navigates back', () => {
      expect(history.push).toHaveBeenCalledWith('/back');
    });
  });

  describe('on failure', () => {
    const apiError = new Error('network error');

    beforeEach(async () => {
      jest
        .spyOn(playerIdentityHttpClient, 'delete')
        .mockRejectedValue(apiError);

      await deletePlayerIdentity('player-1', history, '/back')(dispatch);
    });

    it('dispatches delete failure action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        deletePlayerIdentityFailure(apiError)
      );
    });
  });
});
