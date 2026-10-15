import { playerSocialLinks } from './socialLinks';

describe('playerSocialLinks', () => {
  it('builds the profile address of each network the player filled in', () => {
    expect(
      playerSocialLinks({ instagram: 'ana', twitter: 'ana_tw', facebook: 'ana.fb' })
    ).toEqual([
      { network: 'instagram', href: 'https://instagram.com/ana' },
      { network: 'twitter', href: 'https://twitter.com/ana_tw' },
      { network: 'facebook', href: 'https://facebook.com/ana.fb' }
    ]);
  });

  it('skips networks that are missing or blank', () => {
    expect(playerSocialLinks({ instagram: 'ana', twitter: '  ', facebook: undefined })).toEqual([
      { network: 'instagram', href: 'https://instagram.com/ana' }
    ]);
  });

  it('drops the leading @ people type into the handle', () => {
    expect(playerSocialLinks({ instagram: '@ana' })).toEqual([
      { network: 'instagram', href: 'https://instagram.com/ana' }
    ]);
  });

  it('returns nothing for a player with no social network', () => {
    expect(playerSocialLinks({})).toEqual([]);
  });
});
