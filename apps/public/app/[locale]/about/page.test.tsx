import { render, screen, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { getAboutStats } from '@gochamps/api-client';
import AboutPage from './page';
import messages from '../../../messages/pt.json';

jest.mock('@gochamps/api-client', () => ({
  getAboutStats: jest.fn()
}));

// Resolves dotted keys ("values.visibility.title") against the nested catalogue.
jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: async (namespace: string) => {
    const dict = require('../../../messages/pt.json')[namespace];
    return (key: string) =>
      key
        .split('.')
        .reduce((node: any, part: string) => node?.[part], dict) as string;
  }
}));

const getAboutStatsMock = getAboutStats as jest.MockedFunction<
  typeof getAboutStats
>;

const stats = {
  gamesCount: 3247,
  tournamentsCount: 315,
  organizationsCount: 31,
  teamsCount: 480,
  playersCount: 5230
};

const renderPage = async () =>
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      {await AboutPage({ params: Promise.resolve({ locale: 'pt' }) })}
    </NextIntlClientProvider>
  );

describe('AboutPage', () => {
  beforeEach(() => {
    getAboutStatsMock.mockReset();
  });

  it('renders every section of the page', async () => {
    getAboutStatsMock.mockResolvedValue(stats);

    await renderPage();

    expect(
      screen.getByRole('heading', { level: 1, name: messages.about.heroTitle })
    ).toBeInTheDocument();
    [
      messages.about.missionTitle,
      messages.about.audienceTitle,
      messages.about.trustTitle,
      messages.about.platformTitle,
      messages.about.ctaTitle,
      messages.about.teamTitle,
      messages.about.organizersTitle
    ].forEach(title => {
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: new RegExp(title.replace('.', '\\.'))
        })
      ).toBeInTheDocument();
    });
  });

  it('renders the five counters in the rounded format', async () => {
    getAboutStatsMock.mockResolvedValue(stats);

    await renderPage();

    expect(screen.getByText('+30')).toBeInTheDocument();
    expect(screen.getByText('+300')).toBeInTheDocument();
    expect(screen.getByText('+500')).toBeInTheDocument();
    expect(screen.getByText('+5.000')).toBeInTheDocument();
    expect(screen.getByText('+3.000')).toBeInTheDocument();
    expect(screen.getByText(messages.about.metrics.teams)).toBeInTheDocument();
    // "Atletas" is also the audience card label.
    expect(
      screen.getAllByText(messages.about.metrics.athletes)
    ).toHaveLength(2);
  });

  it('falls back to placeholders when the stats request fails', async () => {
    getAboutStatsMock.mockRejectedValue(new Error('boom'));

    await renderPage();

    expect(screen.getAllByText('---')).toHaveLength(5);
    expect(
      screen.getByRole('heading', { level: 1, name: messages.about.heroTitle })
    ).toBeInTheDocument();
  });

  it('shows "---" only for the counters the API does not serve yet', async () => {
    getAboutStatsMock.mockResolvedValue({
      gamesCount: 3247,
      tournamentsCount: 315,
      organizationsCount: 31
    });

    await renderPage();

    expect(screen.getAllByText('---')).toHaveLength(2);
  });

  it('sends both tournament calls to action to the tournament search', async () => {
    getAboutStatsMock.mockResolvedValue(stats);

    await renderPage();

    expect(
      screen.getByRole('link', { name: messages.about.findTournaments })
    ).toHaveAttribute('href', '/');
    expect(
      screen.getByRole('link', { name: messages.about.exploreTournaments })
    ).toHaveAttribute('href', '/');
  });

  it('renders the organizers audience card without a link or demo booking', async () => {
    getAboutStatsMock.mockResolvedValue(stats);

    await renderPage();

    const card = screen
      .getByRole('heading', { name: messages.about.audiences.organizers.title })
      .closest('article') as HTMLElement;

    expect(within(card).queryByRole('link')).not.toBeInTheDocument();
    expect(card.querySelector('a')).toBeNull();
    expect(
      screen.queryByText(/Agende uma demonstração/)
    ).not.toBeInTheDocument();
  });

  it('exposes the organizers section as an anchor target', async () => {
    getAboutStatsMock.mockResolvedValue(stats);

    const { container } = await renderPage();

    expect(container.querySelector('section#organizers')).toBeInTheDocument();
  });

  it('shows the fixed trusted organizations', async () => {
    getAboutStatsMock.mockResolvedValue(stats);

    await renderPage();

    ['CBB', 'FGB', 'FBERJ'].forEach(name => {
      expect(screen.getByRole('link', { name })).toBeInTheDocument();
    });
  });

  it('renders the team and keeps the founder link', async () => {
    getAboutStatsMock.mockResolvedValue(stats);

    await renderPage();

    expect(
      screen.getByRole('heading', { level: 3, name: 'Lair Júnior' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: new RegExp(messages.about.lairCta) })
    ).toHaveAttribute('href', 'https://www.lairjr.me');
  });

  it('never calls an athlete "jogador"', async () => {
    getAboutStatsMock.mockResolvedValue(stats);

    const { container } = await renderPage();

    expect(container.textContent).not.toMatch(/jogador/i);
  });
});
