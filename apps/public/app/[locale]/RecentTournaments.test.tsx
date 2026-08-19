import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import type { RecentlyViewEntity } from '@gochamps/api-client';
import { RecentTournaments } from './RecentTournaments';
import { PINNED_RECENTLY_VIEWS_KEY } from './usePinnedRecentlyViews';
import messages from '../../messages/pt.json';

const recentlyView = (id: string): RecentlyViewEntity => ({
  tournamentId: id,
  tournamentName: `Torneio ${id}`,
  tournamentSlug: `torneio-${id}`,
  organizationName: 'Org Teste',
  organizationSlug: 'org-teste',
  organizationLogoUrl: '',
  views: 1
});

const fetchMock = jest.fn();

const renderBoard = () =>
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <RecentTournaments cmsUrl="https://cms.example" />
    </NextIntlClientProvider>
  );

const respondWith = (views: RecentlyViewEntity[]) =>
  fetchMock.mockResolvedValue({ ok: true, json: async () => views });

const cardNames = () =>
  screen.getAllByRole('link').map(link => link.textContent);

describe('RecentTournaments', () => {
  beforeEach(() => {
    localStorage.clear();
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  it('loads the recently viewed tournaments', async () => {
    respondWith([recentlyView('a'), recentlyView('b')]);

    renderBoard();

    expect(await screen.findByText('Torneio a')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/api/recently-views');
    expect(screen.getByRole('link', { name: /Torneio b/ })).toHaveAttribute(
      'href',
      'https://cms.example/org-teste/torneio-b'
    );
  });

  it('lists pinned tournaments before the rest', async () => {
    localStorage.setItem(
      PINNED_RECENTLY_VIEWS_KEY,
      JSON.stringify([recentlyView('b')])
    );
    respondWith([recentlyView('a'), recentlyView('b')]);

    renderBoard();

    await screen.findByText('Torneio a');
    await waitFor(() => {
      expect(cardNames()[0]).toContain('Torneio b');
    });
    expect(cardNames()).toHaveLength(2);
  });

  it('pins a tournament when its pin button is used', async () => {
    const user = userEvent.setup();
    respondWith([recentlyView('a'), recentlyView('b')]);

    renderBoard();
    await screen.findByText('Torneio a');

    await user.click(screen.getAllByRole('button', { name: 'Fixar' })[1]);

    await waitFor(() => {
      expect(
        screen.getAllByRole('button', { name: 'Desfixar' })
      ).toHaveLength(1);
    });
    expect(cardNames()[0]).toContain('Torneio b');
    expect(localStorage.getItem(PINNED_RECENTLY_VIEWS_KEY)).toContain('b');
  });

  it('shows at most 15 tournaments', async () => {
    respondWith(
      Array.from({ length: 20 }, (_unused, index) =>
        recentlyView(String(index))
      )
    );

    renderBoard();
    await screen.findByText('Torneio 0');

    expect(cardNames()).toHaveLength(15);
  });

  it('renders nothing when the request fails', async () => {
    fetchMock.mockRejectedValue(new Error('offline'));

    const { container } = renderBoard();

    await waitFor(() => {
      expect(container.querySelectorAll('a')).toHaveLength(0);
    });
  });
});
