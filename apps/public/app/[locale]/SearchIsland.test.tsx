import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { SearchIsland } from './SearchIsland';
import messages from '../../messages/pt.json';

const ligaTeste = {
  id: '1',
  name: 'Liga Teste',
  slug: 'liga-teste',
  logoUrl: '',
  organizationName: 'Org Teste',
  organizationSlug: 'org-teste',
  organizationLogoUrl: ''
};

const recentlyViewed = {
  tournamentId: 'r1',
  tournamentName: 'Torneio Recente',
  tournamentSlug: 'torneio-recente',
  organizationName: 'Org Recente',
  organizationSlug: 'org-recente',
  organizationLogoUrl: '',
  views: 3
};

const searchResults: unknown[] = [];
const fetchMock = jest.fn();

const jsonResponse = (payload: unknown) => ({
  ok: true,
  json: async () => payload
});

const renderIsland = () =>
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <SearchIsland cmsUrl="https://cms.example" />
    </NextIntlClientProvider>
  );

// The recently viewed board loads on mount; letting it settle first keeps
// its state updates inside act().
const renderIslandLoaded = async () => {
  renderIsland();
  await screen.findByText('Torneio Recente');
};

const advanceTimers = async (ms: number) => {
  await act(async () => {
    jest.advanceTimersByTime(ms);
  });
};

const setupUser = () =>
  userEvent.setup({
    advanceTimers: ms => act(() => jest.advanceTimersByTime(ms))
  });

const searchCalls = () =>
  fetchMock.mock.calls.filter(([url]: [string]) =>
    url.startsWith('/api/search')
  );

describe('SearchIsland', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
    searchResults.length = 0;
    fetchMock.mockReset();
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve(
        jsonResponse(
          url.startsWith('/api/search') ? searchResults : [recentlyViewed]
        )
      )
    );
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows the recently viewed tournaments before anything is typed', async () => {
    renderIsland();

    expect(await screen.findByText('Torneio Recente')).toBeInTheDocument();
    expect(searchCalls()).toHaveLength(0);
  });

  it('waits for the debounce before querying', async () => {
    searchResults.push(ligaTeste);
    const user = setupUser();
    await renderIslandLoaded();

    await user.type(screen.getByRole('searchbox'), 'Liga');
    await advanceTimers(400);

    expect(searchCalls()).toHaveLength(0);

    await advanceTimers(100);

    await waitFor(() => expect(searchCalls()).toHaveLength(1));
    expect(searchCalls()[0][0]).toBe('/api/search?term=Liga');
  });

  it('renders each result as a link to the tournament on the CMS', async () => {
    searchResults.push(ligaTeste);
    const user = setupUser();
    await renderIslandLoaded();

    await user.type(screen.getByRole('searchbox'), 'Liga');
    await advanceTimers(500);

    const link = await screen.findByRole('link', { name: /Liga Teste/ });
    expect(link).toHaveAttribute(
      'href',
      'https://cms.example/org-teste/liga-teste'
    );
    expect(screen.getByText('Org Teste')).toBeInTheDocument();
  });

  it('reports when the search returns nothing', async () => {
    const user = setupUser();
    await renderIslandLoaded();

    await user.type(screen.getByRole('searchbox'), 'Liga');
    await advanceTimers(500);

    expect(
      await screen.findByText('Campeonato não encontrado.')
    ).toBeInTheDocument();
  });

  it('keeps the results empty when the request fails', async () => {
    fetchMock.mockImplementation((url: string) =>
      url.startsWith('/api/search')
        ? Promise.reject(new Error('offline'))
        : Promise.resolve(jsonResponse([recentlyViewed]))
    );
    const user = setupUser();
    await renderIslandLoaded();

    await user.type(screen.getByRole('searchbox'), 'Liga');
    await advanceTimers(500);

    expect(
      await screen.findByText('Campeonato não encontrado.')
    ).toBeInTheDocument();
  });
});
