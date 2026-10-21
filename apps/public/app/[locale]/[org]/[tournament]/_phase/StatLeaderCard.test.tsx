import { fireEvent, render, screen } from '@testing-library/react';
import type { LeaderCard } from '@/src/stats/statLeaders';
import { StatLeaderCard } from './StatLeaderCard';

const row = (playerId: string, playerName: string, value: string) => ({
  playerId,
  playerName,
  photoUrl: '',
  teamName: 'Recreio da Juventude',
  value
});

const renderCard = (card: LeaderCard) =>
  render(
    <StatLeaderCard
      card={card}
      statsPath="/org/tour/stats"
      seeAllLabel="Ver todos"
      scopeLabels={{ aggregate: 'Totais', per_game: 'Por jogo' }}
      scopeLegend="Estatísticas"
    />
  );

describe('StatLeaderCard', () => {
  const pointsCard: LeaderCard = {
    slug: 'points',
    title: 'Pontos',
    scopes: [
      { scope: 'aggregate', statKey: 'points', leaders: [row('p1', 'Ana', '303')] },
      {
        scope: 'per_game',
        statKey: 'points_per_game',
        leaders: [row('p2', 'Bia', '21.5')]
      }
    ]
  };

  it('opens on the totals, linking to their ranking', () => {
    renderCard(pointsCard);

    expect(screen.getByText('Pontos')).toBeInTheDocument();
    expect(screen.getByText('Ana')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Totais' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('link', { name: 'Ver todos →' })).toHaveAttribute(
      'href',
      '/org/tour/stats?stat=points'
    );
  });

  it('switches to the per-game ranking and its link', () => {
    renderCard(pointsCard);

    fireEvent.click(screen.getByRole('button', { name: 'Por jogo' }));

    expect(screen.queryByText('Ana')).not.toBeInTheDocument();
    expect(screen.getByText('Bia')).toBeInTheDocument();
    expect(screen.getByText('21.5')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver todos →' })).toHaveAttribute(
      'href',
      '/org/tour/stats?stat=points_per_game'
    );
  });

  it('offers no toggle when the stat has a single scope', () => {
    renderCard({
      slug: 'efficiency',
      title: 'Eficiência',
      scopes: [
        {
          scope: 'per_game',
          statKey: 'efficiency_per_game',
          leaders: [row('p1', 'Ana', '12.0')]
        }
      ]
    });

    expect(screen.queryByTestId('stat-leader-scope')).not.toBeInTheDocument();
    expect(screen.getByText('12.0')).toBeInTheDocument();
  });
});
