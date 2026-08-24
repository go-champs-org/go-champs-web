import { render, screen } from '@testing-library/react';
import { ApiError, getTournamentBySlug } from '@gochamps/api-client';
import { notFound } from 'next/navigation';
import TeamPage, { generateMetadata, revalidate } from './page';
import { SITE_URL } from '@/src/seo/metadata';

jest.mock('@gochamps/api-client', () => ({
  ...jest.requireActual('@gochamps/api-client'),
  getTournamentBySlug: jest.fn()
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  })
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: async (input: string | { namespace: string }) => {
    const namespace = typeof input === 'string' ? input : input.namespace;
    const dictionary = (
      require('@/messages/pt.json') as Record<string, Record<string, string>>
    )[namespace];

    return (key: string, values?: Record<string, string>) =>
      Object.entries(values || {}).reduce(
        (message, [name, value]) => message.replace(`{${name}}`, value),
        dictionary[key]
      );
  }
}));

const getTournamentBySlugMock = getTournamentBySlug as jest.Mock;

const team = (id: string, name: string, overrides = {}) => ({
  id,
  name,
  logoUrl: '',
  triCode: '',
  primaryColor: '',
  coaches: [],
  ...overrides
});

const tournament = (overrides = {}) => ({
  id: 'tour1',
  name: 'Torneio Teste',
  slug: 'torneio-teste',
  logoUrl: '',
  sportSlug: 'basketball_5x5',
  sportName: 'Basquete 5x5',
  playerStats: [],
  scoreboardSetting: { liveSiteUpdate: 'full-live-update' },
  teams: [team('t1', 'Time A'), team('t2', 'Time B')],
  ...overrides
});

const params = Promise.resolve({
  locale: 'pt',
  org: 'org',
  tournament: 'torneio-teste',
  teamId: 't2'
});

const renderPage = async () => render(await TeamPage({ params }));

describe('TeamPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getTournamentBySlugMock.mockResolvedValue(tournament());
  });

  it('renders the team name from the tournament roster', async () => {
    await renderPage();

    expect(screen.getByText('Time B')).toBeInTheDocument();
  });

  it('links back to the tournament page on the CMS', async () => {
    await renderPage();

    expect(screen.getByRole('link', { name: 'Torneio Teste' })).toHaveAttribute(
      'href',
      expect.stringContaining('/org/torneio-teste')
    );
  });

  it('renders the coaching staff', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({
        teams: [
          team('t2', 'Time B', {
            coaches: [{ id: 'c1', name: 'Treinador Um', type: 'head_coach' }]
          })
        ]
      })
    );

    await renderPage();

    expect(screen.getByText('Treinador Um')).toBeInTheDocument();
  });

  it('renders a 404 when the tournament has no team with that id', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({ teams: [team('t1', 'Time A')] })
    );

    await expect(renderPage()).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('renders a 404 when the tournament does not exist', async () => {
    getTournamentBySlugMock.mockRejectedValue(
      new ApiError({ status: 404, data: null })
    );

    await expect(renderPage()).rejects.toThrow('NEXT_NOT_FOUND');
  });

  it('revalidates the page instead of rendering it per request', () => {
    expect(revalidate).toBeGreaterThan(0);
  });
});

describe('generateMetadata', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getTournamentBySlugMock.mockResolvedValue(tournament());
  });

  it('titles the page with the team and canonicalizes the locale url', async () => {
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toContain('Time B');
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL}/pt/org/torneio-teste/times/t2`
    );
    expect(metadata.robots).toBeUndefined();
  });

  it('keeps a missing team out of the index', async () => {
    getTournamentBySlugMock.mockResolvedValue(
      tournament({ teams: [team('t1', 'Time A')] })
    );

    const metadata = await generateMetadata({ params });

    expect(metadata.robots).toEqual({ index: false });
  });
});
