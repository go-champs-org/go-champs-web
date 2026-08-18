import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { getAboutStats } from '@gochamps/api-client';
import AboutPage from './page';
import messages from '../../../messages/pt.json';

jest.mock('@gochamps/api-client', () => ({
  getAboutStats: jest.fn()
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: async (namespace: string) => {
    const dict = (
      require('../../../messages/pt.json') as Record<
        string,
        Record<string, string>
      >
    )[namespace];
    return (key: string) => dict[key];
  }
}));

const getAboutStatsMock = getAboutStats as jest.MockedFunction<
  typeof getAboutStats
>;

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

  it('renders the about heading and the ported content', async () => {
    getAboutStatsMock.mockResolvedValue({
      gamesCount: 3247,
      tournamentsCount: 315,
      organizationsCount: 31
    });

    await renderPage();

    expect(
      screen.getByRole('heading', { level: 1, name: messages.about.aboutUs })
    ).toBeInTheDocument();
    expect(
      screen.getByText(messages.about.aboutUsParagraph1)
    ).toBeInTheDocument();
    expect(
      screen.getByText(messages.about.aboutUsListItem1)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: messages.about.theTeam })
    ).toBeInTheDocument();
  });

  it('renders the rounded stat counters with their labels', async () => {
    getAboutStatsMock.mockResolvedValue({
      gamesCount: 3247,
      tournamentsCount: 315,
      organizationsCount: 31
    });

    await renderPage();

    expect(screen.getByText('+3.000')).toBeInTheDocument();
    expect(screen.getByText('+300')).toBeInTheDocument();
    expect(screen.getByText('+30')).toBeInTheDocument();
    expect(screen.getByText(messages.about.games)).toBeInTheDocument();
    expect(screen.getByText(messages.about.tournaments)).toBeInTheDocument();
    expect(screen.getByText(messages.about.organizations)).toBeInTheDocument();
  });

  it('falls back to placeholders when the stats request fails', async () => {
    getAboutStatsMock.mockRejectedValue(new Error('boom'));

    await renderPage();

    expect(screen.getAllByText('---')).toHaveLength(3);
    expect(
      screen.getByRole('heading', { level: 1, name: messages.about.aboutUs })
    ).toBeInTheDocument();
  });
});
