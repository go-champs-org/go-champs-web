import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import type { RecentlyViewEntity } from '@gochamps/api-client';
import { SearchIsland } from './SearchIsland';
import messages from '../../../messages/pt.json';

const ligaTeste = {
  id: '1',
  name: 'Liga Teste',
  slug: 'liga-teste',
  logoUrl: '',
  organizationName: 'Org Teste',
  organizationSlug: 'org-teste',
  organizationLogoUrl: ''
};

const recentlyViews: RecentlyViewEntity[] = [
  {
    tournamentId: 'r1',
    tournamentName: 'Torneio Recente',
    tournamentSlug: 'torneio-recente',
    organizationName: 'Org Recente',
    organizationSlug: 'org-recente',
    organizationLogoUrl: '',
    views: 3
  }
];

const searchResults: unknown[] = [];
const fetchMock = jest.fn();

const renderIsland = () =>
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <SearchIsland
        cmsUrl="https://cms.example"
        recentlyViews={recentlyViews}
      />
    </NextIntlClientProvider>
  );

const advanceTimers = async (ms: number) => {
  await act(async () => {
    jest.advanceTimersByTime(ms);
  });
};

const setupUser = () =>
  userEvent.setup({
    advanceTimers: ms => act(() => jest.advanceTimersByTime(ms))
  });

describe('SearchIsland', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
    searchResults.length = 0;
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({ ok: true, json: async () => searchResults });
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows the recently viewed tournaments before anything is typed', () => {
    renderIsland();

    expect(screen.getByText('Torneio Recente')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('waits for the debounce before querying', async () => {
    searchResults.push(ligaTeste);
    const user = setupUser();
    renderIsland();

    await user.type(screen.getByRole('searchbox'), 'Liga');
    await advanceTimers(400);

    expect(fetchMock).not.toHaveBeenCalled();

    await advanceTimers(100);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith('/api/search?term=Liga');
  });

  it('goes back to the recently viewed board when the term is cleared', async () => {
    searchResults.push(ligaTeste);
    const user = setupUser();
    renderIsland();

    const searchbox = screen.getByRole('searchbox');
    await user.type(searchbox, 'Liga');
    await advanceTimers(500);
    await screen.findByRole('link', { name: /Liga Teste/ });

    await user.clear(searchbox);

    expect(screen.getByText('Torneio Recente')).toBeInTheDocument();
  });

  it('drops the in-flight state when the term is cleared', async () => {
    // A request that never settles: the island is left mid-search.
    fetchMock.mockImplementationOnce(() => new Promise(() => {}));
    const user = setupUser();
    renderIsland();

    const searchbox = screen.getByRole('searchbox');
    await user.type(searchbox, 'Liga');
    await advanceTimers(500);

    await user.clear(searchbox);
    await advanceTimers(500);
    await user.type(searchbox, 'Copa');

    // Nothing has been asked for 'Copa' yet, so the prompt shows instead of the
    // shimmer left behind by the abandoned request.
    expect(screen.getByText('Digite para pesquisar...')).toBeInTheDocument();
  });

  it('reports when the search returns nothing', async () => {
    const user = setupUser();
    renderIsland();

    await user.type(screen.getByRole('searchbox'), 'Liga');
    await advanceTimers(500);

    expect(
      await screen.findByText('Campeonato não encontrado.')
    ).toBeInTheDocument();
  });

  it('keeps the results empty when the request fails', async () => {
    fetchMock.mockRejectedValue(new Error('offline'));
    const user = setupUser();
    renderIsland();

    await user.type(screen.getByRole('searchbox'), 'Liga');
    await advanceTimers(500);

    expect(
      await screen.findByText('Campeonato não encontrado.')
    ).toBeInTheDocument();
  });
});
