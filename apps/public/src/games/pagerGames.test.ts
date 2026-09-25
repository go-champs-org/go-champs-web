import type { GameEntity } from '@gochamps/api-client';
import { toPagerDays } from './pagerGames';

const team = (id: string) => ({
  id,
  name: `Team ${id}`,
  logoUrl: 'https://x/logo.png',
  triCode: 'TT',
  primaryColor: '#000',
  coaches: [{ id: 'c', name: 'Coach', type: 'head_coach' }]
});

const game = {
  id: 'g1',
  assets: [{ id: 'a', type: 'video', url: 'https://x' }],
  awayPlaceholder: '',
  awayScore: 70,
  awayTeam: team('away'),
  datetime: '2026-09-24T22:00:00Z',
  homePlaceholder: '',
  homeScore: 80,
  homeTeam: team('home'),
  info: 'long free text',
  isFinished: true,
  location: 'Ginásio',
  city: 'Rio',
  court: '1',
  number: '7',
  phaseId: 'p',
  youTubeCode: 'yt',
  liveState: 'ended',
  resultType: 'automatic'
} as unknown as GameEntity;

describe('toPagerDays', () => {
  it('keeps only what a game card renders', () => {
    expect(toPagerDays([{ key: '2026-09-24', label: '24 de setembro', games: [game] }])).toEqual([
      {
        key: '2026-09-24',
        label: '24 de setembro',
        games: [
          {
            id: 'g1',
            datetime: '2026-09-24T22:00:00Z',
            location: 'Ginásio',
            homeScore: 80,
            awayScore: 70,
            homePlaceholder: '',
            awayPlaceholder: '',
            isFinished: true,
            resultType: 'automatic',
            homeTeam: { id: 'home', name: 'Team home' },
            awayTeam: { id: 'away', name: 'Team away' }
          }
        ]
      }
    ]);
  });
});
