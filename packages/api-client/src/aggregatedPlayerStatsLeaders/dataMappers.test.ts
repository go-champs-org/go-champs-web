import { mapApiStatLeadersToEntity } from './dataMappers';

describe('mapApiStatLeadersToEntity', () => {
  it('maps snake_case API fields to camelCase entity fields', () => {
    const result = mapApiStatLeadersToEntity({
      stat_key: 'points',
      qualifier: null,
      leaders: [
        {
          player_id: 'p1',
          team_id: 'team1',
          value: 30,
          player: { name: 'Ana', shirt_number: '7', photo_url: 'https://photo' }
        }
      ]
    });

    expect(result).toEqual({
      statKey: 'points',
      qualifier: null,
      leaders: [
        {
          playerId: 'p1',
          teamId: 'team1',
          value: 30,
          playerName: 'Ana',
          shirtNumber: '7',
          photoUrl: 'https://photo'
        }
      ]
    });
  });

  it('turns missing team, shirt number and photo into empty strings', () => {
    const result = mapApiStatLeadersToEntity({
      stat_key: 'points',
      qualifier: null,
      leaders: [
        {
          player_id: 'p1',
          team_id: null,
          value: 30,
          player: { name: 'Ana', shirt_number: null, photo_url: null }
        }
      ]
    });

    expect(result.leaders[0]).toEqual({
      playerId: 'p1',
      teamId: '',
      value: 30,
      playerName: 'Ana',
      shirtNumber: '',
      photoUrl: ''
    });
  });
});
