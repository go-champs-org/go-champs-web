import { render, screen } from '@testing-library/react';
import OrganizationPage, { generateMetadata } from './page';
import {
  ApiError,
  getOrganizationBySlug,
  getTournamentsByOrganizationSlug
} from '@gochamps/api-client';

jest.mock('@gochamps/api-client', () => ({
  ...jest.requireActual('@gochamps/api-client'),
  getOrganizationBySlug: jest.fn(),
  getTournamentsByOrganizationSlug: jest.fn()
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  })
}));

interface Messages {
  [key: string]: string | Messages;
}

const messageAt = (dictionary: Messages, key: string): unknown =>
  key
    .split('.')
    .reduce<unknown>((node, part) => (node as Messages)[part], dictionary);

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: async (input: string | { namespace: string }) => {
    const namespace = typeof input === 'string' ? input : input.namespace;
    const messages: Record<string, Messages> = {
      organization: {
        breadcrumbHome: 'Home',
        tournamentsCount: '{count} campeonatos',
        noTournaments: 'Nenhum campeonato encontrado'
      },
      metadata: {
        organizationTitle: '{organization} — Go Champs',
        organizationDescription: 'Campeonatos de {organization} na Go Champs.'
      }
    };

    const dictionary = messages[namespace] || {};

    return Object.assign(
      (key: string, values?: Record<string, string | number>) =>
        Object.entries(values || {}).reduce(
          (message, [name, value]) =>
            message.replace(`{${name}}`, String(value)),
          messageAt(dictionary, key) as string
        ),
      { raw: (key: string) => messageAt(dictionary, key) }
    );
  }
}));

const getOrganizationBySlugMock = getOrganizationBySlug as jest.Mock;
const getTournamentsByOrganizationSlugMock =
  getTournamentsByOrganizationSlug as jest.Mock;

const ORGANIZATION = {
  id: 'org1',
  name: 'NLBB',
  slug: 'nlbb',
  logoUrl: 'https://example.com/logo.png'
};

const TOURNAMENTS = [
  { id: 't1', name: 'Taça Bauru', slug: 'tacabauru', logoUrl: '' },
  { id: 't2', name: 'Copa Paulista', slug: 'copa-paulista', logoUrl: '' }
];

describe('OrganizationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the organization name, avatar and tournament count', async () => {
    getOrganizationBySlugMock.mockResolvedValue(ORGANIZATION);
    getTournamentsByOrganizationSlugMock.mockResolvedValue(TOURNAMENTS);

    const jsx = await OrganizationPage({
      params: Promise.resolve({ locale: 'pt', org: 'nlbb' })
    });
    render(jsx);

    expect(
      screen.getByRole('heading', { name: 'NLBB' })
    ).toBeInTheDocument();
    expect(screen.getByText('2 campeonatos')).toBeInTheDocument();
  });

  it('lists each tournament linking to its page', async () => {
    getOrganizationBySlugMock.mockResolvedValue(ORGANIZATION);
    getTournamentsByOrganizationSlugMock.mockResolvedValue(TOURNAMENTS);

    const jsx = await OrganizationPage({
      params: Promise.resolve({ locale: 'pt', org: 'nlbb' })
    });
    render(jsx);

    const link = screen.getByText('Taça Bauru').closest('a');
    expect(link).toHaveAttribute('href', '/pt/nlbb/tacabauru');
  });

  it('shows an empty state when the organization has no tournaments', async () => {
    getOrganizationBySlugMock.mockResolvedValue(ORGANIZATION);
    getTournamentsByOrganizationSlugMock.mockResolvedValue([]);

    const jsx = await OrganizationPage({
      params: Promise.resolve({ locale: 'pt', org: 'nlbb' })
    });
    render(jsx);

    expect(screen.getByText('Nenhum campeonato encontrado')).toBeInTheDocument();
  });

  it('calls notFound when the organization does not exist', async () => {
    getOrganizationBySlugMock.mockRejectedValue(
      new ApiError({ status: 404, data: 'not found' })
    );

    await expect(
      OrganizationPage({
        params: Promise.resolve({ locale: 'pt', org: 'missing' })
      })
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });

  it('builds page metadata from the organization name', async () => {
    getOrganizationBySlugMock.mockResolvedValue(ORGANIZATION);

    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'pt', org: 'nlbb' })
    });

    expect(metadata.title).toBe('NLBB — Go Champs');
  });
});
