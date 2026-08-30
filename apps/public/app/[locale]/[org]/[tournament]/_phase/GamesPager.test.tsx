import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GamesPager } from './GamesPager';
import type { GameDay } from '@/src/games/gamesByDate';

const emptyTeam = (id: string, name: string) => ({
  id,
  name,
  logoUrl: '',
  triCode: '',
  primaryColor: '',
  coaches: []
});

const game = (overrides: Record<string, unknown> = {}) => ({
  id: 'g1',
  assets: [],
  homeTeam: emptyTeam('t1', 'Time A'),
  awayTeam: emptyTeam('t2', 'Time B'),
  homeScore: 0,
  awayScore: 0,
  datetime: '2026-08-27T18:00:00Z',
  location: '',
  city: '',
  isFinished: false,
  awayPlaceholder: '',
  homePlaceholder: '',
  info: '',
  number: '1',
  phaseId: 'ph1',
  youTubeCode: '',
  liveState: '',
  resultType: '',
  ...overrides
});

const DEFAULT_PROPS = {
  locale: 'pt',
  gameHrefBase: '/pt/org/tour/jogos/',
  title: 'Partidas',
  previousDayLabel: 'Dia anterior',
  nextDayLabel: 'Próximo dia',
  undecidedLabel: 'A definir',
  winnerLabel: 'Vencedor'
};

describe('GamesPager', () => {
  it('shows the title, the initial day date, and its games', () => {
    const days: GameDay[] = [
      { key: '2026-08-27', label: '27 de agosto', games: [game()] }
    ];

    render(<GamesPager days={days} initialIndex={0} {...DEFAULT_PROPS} />);

    expect(screen.getByText('Partidas')).toBeInTheDocument();
    expect(screen.getByText('27/08/2026')).toBeInTheDocument();
    expect(screen.getByText('Time A')).toBeInTheDocument();
    expect(screen.getByText('Time B')).toBeInTheDocument();
  });

  it('shows the game location', () => {
    const days: GameDay[] = [
      {
        key: '2026-08-27',
        label: '27 de agosto',
        games: [game({ location: 'Ginásio Municipal' })]
      }
    ];

    render(<GamesPager days={days} initialIndex={0} {...DEFAULT_PROPS} />);

    expect(screen.getByText('Ginásio Municipal')).toBeInTheDocument();
  });

  it('marks the winning side and mutes the losing side', () => {
    const days: GameDay[] = [
      {
        key: '2026-08-27',
        label: '27 de agosto',
        games: [game({ isFinished: true, homeScore: 87, awayScore: 72 })]
      }
    ];

    render(<GamesPager days={days} initialIndex={0} {...DEFAULT_PROPS} />);

    // Weight/tone carry the signal on screen; the winner is still announced
    // to screen readers via the sr-only label next to its name.
    expect(
      screen.getByText('Time A').parentElement
    ).toHaveTextContent('Vencedor');
    expect(
      screen.getByText('Time B').parentElement
    ).not.toHaveTextContent('Vencedor');
  });

  it('disables the previous button on the first day and the next button on the last day', () => {
    const days: GameDay[] = [
      { key: '2026-08-27', label: 'day1', games: [game({ id: 'g1' })] },
      { key: '2026-08-28', label: 'day2', games: [game({ id: 'g2' })] }
    ];

    render(<GamesPager days={days} initialIndex={0} {...DEFAULT_PROPS} />);

    expect(screen.getByRole('button', { name: 'Dia anterior' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Próximo dia' })).not.toBeDisabled();
  });

  it('navigates to the next day when the next button is clicked', async () => {
    const user = userEvent.setup();
    const days: GameDay[] = [
      {
        key: '2026-08-27',
        label: 'day1',
        games: [game({ id: 'g1', homeTeam: emptyTeam('t1', 'Time A') })]
      },
      {
        key: '2026-08-28',
        label: 'day2',
        games: [game({ id: 'g2', homeTeam: emptyTeam('t3', 'Time C') })]
      }
    ];

    render(<GamesPager days={days} initialIndex={0} {...DEFAULT_PROPS} />);
    await user.click(screen.getByRole('button', { name: 'Próximo dia' }));

    expect(screen.getByText('Time C')).toBeInTheDocument();
    expect(screen.queryByText('Time A')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próximo dia' })).toBeDisabled();
  });

  it('sends each game to its own page, as the CMS sidebar does', () => {
    const days: GameDay[] = [
      { key: '2026-08-27', label: '27 de agosto', games: [game()] }
    ];

    render(<GamesPager days={days} initialIndex={0} {...DEFAULT_PROPS} />);

    expect(screen.getByRole('link', { name: /Time A/ })).toHaveAttribute(
      'href',
      '/pt/org/tour/jogos/g1'
    );
  });
});
