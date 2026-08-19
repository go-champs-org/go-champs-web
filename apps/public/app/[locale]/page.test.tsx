import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import {
  getRecentlyViewedOrganizations,
  getRecentlyViews
} from '@gochamps/api-client';
import RootPage from './page';
import messages from '../../messages/pt.json';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: jest.fn()
}));

jest.mock('@gochamps/api-client', () => ({
  getRecentlyViews: jest.fn(),
  getRecentlyViewedOrganizations: jest.fn()
}));

const getRecentlyViewsMock = getRecentlyViews as jest.Mock;
const getRecentlyViewedOrganizationsMock =
  getRecentlyViewedOrganizations as jest.Mock;

const renderPage = async () =>
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      {await RootPage({ params: Promise.resolve({ locale: 'pt' }) })}
    </NextIntlClientProvider>
  );

describe('RootPage', () => {
  beforeEach(() => {
    getRecentlyViewsMock.mockReset();
    getRecentlyViewedOrganizationsMock.mockReset();
    getRecentlyViewsMock.mockResolvedValue([
      {
        tournamentId: 't1',
        tournamentName: 'Torneio Recente',
        tournamentSlug: 'torneio-recente',
        organizationName: 'Org Recente',
        organizationSlug: 'org-recente',
        organizationLogoUrl: '',
        views: 3
      }
    ]);
    getRecentlyViewedOrganizationsMock.mockResolvedValue([
      { id: 'o1', name: 'Org Recente', slug: 'org-recente', logoUrl: '' }
    ]);
  });

  it('renders the tournaments and organizations in the HTML itself', async () => {
    await renderPage();

    expect(screen.getByTestId('root-page')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Campeonatos em andamento' })
    ).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByText('Torneio Recente')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Organizações' })
    ).toBeInTheDocument();
  });

  it('still renders when the API is unreachable', async () => {
    getRecentlyViewsMock.mockRejectedValue(new Error('offline'));
    getRecentlyViewedOrganizationsMock.mockRejectedValue(new Error('offline'));

    await renderPage();

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(
      screen.getByText('Nenhuma organização vista ainda')
    ).toBeInTheDocument();
  });
});
