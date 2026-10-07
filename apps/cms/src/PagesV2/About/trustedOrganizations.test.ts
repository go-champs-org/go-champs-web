import { ApiOrganization } from '../../Shared/httpClient/apiTypes';
import {
  getRotatingWindow,
  selectRotatingCandidates
} from './trustedOrganizations';

const organization = (
  slug: string,
  logoUrl?: string,
  name = slug.toUpperCase()
): ApiOrganization => ({ id: slug, name, slug, logo_url: logoUrl });

describe('selectRotatingCandidates', () => {
  it('keeps organizations with a logo, in order', () => {
    const candidates = selectRotatingCandidates(
      [
        organization('liga-a', 'https://example.com/a.png'),
        organization('liga-b', 'https://example.com/b.png')
      ],
      []
    );

    expect(candidates).toEqual([
      { name: 'LIGA-A', slug: 'liga-a', logoUrl: 'https://example.com/a.png' },
      { name: 'LIGA-B', slug: 'liga-b', logoUrl: 'https://example.com/b.png' }
    ]);
  });

  it('drops organizations without a logo or with a blank one', () => {
    const candidates = selectRotatingCandidates(
      [
        organization('no-logo'),
        organization('blank-logo', '   '),
        organization('with-logo', 'https://example.com/logo.png')
      ],
      []
    );

    expect(candidates.map(candidate => candidate.slug)).toEqual(['with-logo']);
  });

  it('leaves out the excluded slugs and repeated organizations', () => {
    const candidates = selectRotatingCandidates(
      [
        organization('cbb', 'https://example.com/cbb.png'),
        organization('liga-a', 'https://example.com/a.png'),
        organization('liga-a', 'https://example.com/a.png')
      ],
      ['cbb']
    );

    expect(candidates.map(candidate => candidate.slug)).toEqual(['liga-a']);
  });

  it('trims the organization name', () => {
    const [candidate] = selectRotatingCandidates(
      [organization('fgb', 'https://example.com/fgb.png', ' Federação ')],
      []
    );

    expect(candidate.name).toBe('Federação');
  });
});

describe('getRotatingWindow', () => {
  const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  it('returns consecutive pages of the given size', () => {
    expect(getRotatingWindow(items, 0, 3)).toEqual(['a', 'b', 'c']);
    expect(getRotatingWindow(items, 1, 3)).toEqual(['d', 'e', 'f']);
  });

  it('wraps around the end of the list', () => {
    expect(getRotatingWindow(items, 2, 3)).toEqual(['g', 'a', 'b']);
    expect(getRotatingWindow(items, 3, 3)).toEqual(['c', 'd', 'e']);
  });

  it('returns the whole list when it fits in one page', () => {
    expect(getRotatingWindow(['a', 'b'], 5, 3)).toEqual(['a', 'b']);
    expect(getRotatingWindow([], 0, 3)).toEqual([]);
  });
});
