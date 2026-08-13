import {
  suggestUsernameFromEmail,
  UsernameSuggestionForm
} from './useUsernameSuggestion';
import accountHttpClient from './accountHttpClient';

describe('suggestUsernameFromEmail', () => {
  let changeUsername: jest.Mock;
  let usernameField: { value?: string; modified?: boolean } | undefined;
  let form: UsernameSuggestionForm;
  let requestedEmail: { current: string | null };
  let lastRequestId: { current: number };
  let onSettled: jest.Mock;

  beforeEach(() => {
    changeUsername = jest.fn();
    usernameField = { value: '', modified: false };
    form = {
      getUsernameField: () => usernameField,
      changeUsername
    };
    requestedEmail = { current: null };
    lastRequestId = { current: 0 };
    onSettled = jest.fn();
  });

  const suggest = (email: string) =>
    suggestUsernameFromEmail({
      email,
      form,
      requestedEmail,
      lastRequestId,
      onSettled
    });

  describe('on success', () => {
    beforeEach(() => {
      jest
        .spyOn(accountHttpClient, 'getUsernameSuggestion')
        .mockResolvedValue({ data: { username: 'joaosilva' } });
    });

    it('fills the username field with the suggestion', async () => {
      await suggest('joao.silva@exemplo.com');

      expect(changeUsername).toHaveBeenCalledWith('joaosilva');
    });

    it('trims the email before requesting', async () => {
      await suggest('  joao.silva@exemplo.com  ');

      expect(accountHttpClient.getUsernameSuggestion).toHaveBeenCalledWith(
        'joao.silva@exemplo.com'
      );
    });

    it('does not overwrite a username the user typed', async () => {
      usernameField = { value: 'meuapelido', modified: true };

      await suggest('joao.silva@exemplo.com');

      expect(changeUsername).not.toHaveBeenCalled();
    });

    it('does not overwrite a username field the user cleared', async () => {
      usernameField = { value: '', modified: true };

      await suggest('joao.silva@exemplo.com');

      expect(changeUsername).not.toHaveBeenCalled();
    });

    it('requests once for the same email', async () => {
      await suggest('joao.silva@exemplo.com');
      await suggest('joao.silva@exemplo.com');

      expect(accountHttpClient.getUsernameSuggestion).toHaveBeenCalledTimes(1);
    });

    it('requests again when the email changes', async () => {
      await suggest('joao.silva@exemplo.com');
      await suggest('outro@exemplo.com');

      expect(accountHttpClient.getUsernameSuggestion).toHaveBeenCalledTimes(2);
    });

    it('settles so the username field can be enabled', async () => {
      await suggest('joao.silva@exemplo.com');

      expect(onSettled).toHaveBeenCalled();
    });
  });

  describe('on an incomplete email', () => {
    beforeEach(() => {
      jest.spyOn(accountHttpClient, 'getUsernameSuggestion');
    });

    it('does not request for a partial email', async () => {
      await suggest('joao.silva@exe');

      expect(accountHttpClient.getUsernameSuggestion).not.toHaveBeenCalled();
    });

    it('does not request for an empty email', async () => {
      await suggest('');

      expect(accountHttpClient.getUsernameSuggestion).not.toHaveBeenCalled();
    });
  });

  describe('on failure', () => {
    beforeEach(() => {
      jest
        .spyOn(accountHttpClient, 'getUsernameSuggestion')
        .mockRejectedValue(new Error('some error'));
    });

    it('leaves the username field untouched', async () => {
      await suggest('joao.silva@exemplo.com');

      expect(changeUsername).not.toHaveBeenCalled();
    });

    it('does not reject', async () => {
      await expect(suggest('joao.silva@exemplo.com')).resolves.toBeUndefined();
    });

    it('settles so the username field is not left disabled', async () => {
      await suggest('joao.silva@exemplo.com');

      expect(onSettled).toHaveBeenCalled();
    });
  });

  describe('on a response that lost the race', () => {
    it('discards the stale suggestion', async () => {
      jest
        .spyOn(accountHttpClient, 'getUsernameSuggestion')
        .mockImplementation(async email => {
          if (email === 'primeiro@exemplo.com') {
            lastRequestId.current += 1;
            return { data: { username: 'primeiro' } };
          }

          return { data: { username: 'segundo' } };
        });

      await suggest('primeiro@exemplo.com');

      expect(changeUsername).not.toHaveBeenCalled();
    });
  });
});
