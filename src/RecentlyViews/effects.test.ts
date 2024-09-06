import { postRecentlyView, VISITED_TOURNAMENTS_KEY } from './effects';
import recentlyViewsHttpClient from './recentlyViewsHttpClient';

describe('postRecentlyView', () => {
  const tournamentId = 'some-id';

  describe('with no tournament id on Storage', () => {
    beforeEach(() => {
      jest.spyOn(recentlyViewsHttpClient, 'post');
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation();

      postRecentlyView(tournamentId);
    });

    it('posts a recently view tournament', () => {
      expect(recentlyViewsHttpClient.post).toHaveBeenCalledWith('some-id');
    });

    it('sets tournament id into session storage', () => {
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        VISITED_TOURNAMENTS_KEY,
        ['', 'some-id'].toString()
      );
    });
  });

  describe('with tournament id already on Storage', () => {
    beforeEach(() => {
      jest.spyOn(recentlyViewsHttpClient, 'post');
      jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValue([tournamentId].toString());
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation();

      postRecentlyView(tournamentId);
    });

    it('does not post a recently view tournament', () => {
      expect(recentlyViewsHttpClient.post).not.toHaveBeenCalled();
    });
  });
});
