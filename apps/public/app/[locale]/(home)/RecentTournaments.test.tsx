import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import type { RecentlyViewEntity } from '@gochamps/api-client';
import { RecentTournaments } from './RecentTournaments';
import { PINNED_RECENTLY_VIEWS_KEY } from '../../../src/hooks/usePinnedRecentlyViews';
import messages from '../../../messages/pt.json';

const recentlyView = (id: string): RecentlyViewEntity => ({
  tournamentId: id,
  tournamentName: `Torneio ${id}`,
  tournamentSlug: `torneio-${id}`,
  organizationName: 'Org Teste',
  organizationSlug: 'org-teste',
  organizationLogoUrl: '',
  views: 1
});

const renderBoard = (recentlyViews: RecentlyViewEntity[]) =>
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <RecentTournaments
        cmsUrl="https://cms.example"
        recentlyViews={recentlyViews}
      />
    </NextIntlClientProvider>
  );

const cardNames = () =>
  screen.getAllByRole('link').map(link => link.textContent);

describe('RecentTournaments', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('pins a tournament when its pin button is used', async () => {
    const user = userEvent.setup();
    renderBoard([recentlyView('a'), recentlyView('b')]);

    await user.click(screen.getAllByRole('button', { name: 'Fixar' })[1]);

    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: 'Desfixar' })).toHaveLength(
        1
      );
    });
    expect(cardNames()[0]).toContain('Torneio b');
    expect(localStorage.getItem(PINNED_RECENTLY_VIEWS_KEY)).toContain('b');
  });
});
