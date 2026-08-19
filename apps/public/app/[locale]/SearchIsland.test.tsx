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
  organizationSlug: 'org-teste'
};

const fetchMock = jest.fn();

const renderIsland = () =>
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <SearchIsland cmsUrl="https://cms.example" />
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

const respondWith = (results: unknown[]) =>
  fetchMock.mockResolvedValue({ ok: true, json: async () => results });

describe('SearchIsland', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('prompts for a term before anything is typed', () => {
    renderIsland();

    expect(screen.getByText('Digite para pesquisar...')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('waits for the debounce before querying', async () => {
    respondWith([ligaTeste]);
    const user = setupUser();
    renderIsland();

    await user.type(screen.getByRole('searchbox'), 'Liga');
    await advanceTimers(400);

    expect(fetchMock).not.toHaveBeenCalled();

    await advanceTimers(100);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith('/api/search?term=Liga');
  });

  it('renders each result as a link to the tournament on the CMS', async () => {
    respondWith([ligaTeste]);
    const user = setupUser();
    renderIsland();

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
    respondWith([]);
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
