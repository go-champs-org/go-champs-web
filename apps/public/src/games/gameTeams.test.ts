import type { TeamEntity } from '@gochamps/domain-types';
import type { GameEntity } from '@gochamps/api-client';
import { gameTeamNames, teamDisplayName } from './gameTeams';

const team = (name: string): TeamEntity => ({
  id: 't1',
  name,
  logoUrl: '',
  triCode: '',
  primaryColor: '',
  coaches: []
});

const game = (overrides: Partial<GameEntity>): GameEntity =>
  ({
    id: 'g1',
    homeTeam: team('Time Casa'),
    awayTeam: team('Time Visitante'),
    homePlaceholder: '',
    awayPlaceholder: '',
    ...overrides
  }) as GameEntity;

describe('teamDisplayName', () => {
  it('uses the team name once the team is known', () => {
    expect(
      teamDisplayName(team('Time Casa'), 'Vencedor do jogo 3', 'A definir')
    ).toBe('Time Casa');
  });

  it('falls back to the bracket placeholder while the team is undecided', () => {
    expect(teamDisplayName(team(''), 'Vencedor do jogo 3', 'A definir')).toBe(
      'Vencedor do jogo 3'
    );
  });

  it('falls back to the translated label when there is no placeholder either', () => {
    expect(teamDisplayName(team(''), '', 'A definir')).toBe('A definir');
  });
});

describe('gameTeamNames', () => {
  it('names both sides of the game', () => {
    expect(gameTeamNames(game({}), 'A definir')).toEqual({
      homeTeam: 'Time Casa',
      awayTeam: 'Time Visitante'
    });
  });

  it('uses each placeholder for the side still undecided', () => {
    expect(
      gameTeamNames(
        game({
          awayTeam: team(''),
          awayPlaceholder: 'Vencedor do jogo 3'
        }),
        'A definir'
      )
    ).toEqual({ homeTeam: 'Time Casa', awayTeam: 'Vencedor do jogo 3' });
  });

  it('names both sides for a game that could not be loaded', () => {
    expect(gameTeamNames(null, 'A definir')).toEqual({
      homeTeam: 'A definir',
      awayTeam: 'A definir'
    });
  });
});
