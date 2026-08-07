import { mapApiPlayerToPlayerEntity } from '@gochamps/api-client';

describe('mapApiPlayerToPlayerEntity', () => {
  it('maps snake_case API player fields to camelCase entity fields', () => {
    const result = mapApiPlayerToPlayerEntity({
      id: 'p1',
      name: 'Player A',
      shirt_name: 'A',
      shirt_number: '10',
      team_id: 't1',
      photo_url: 'https://example.com/p1.png',
      license_number: 'LIC1'
    });

    expect(result).toEqual({
      id: 'p1',
      name: 'Player A',
      shirtName: 'A',
      shirtNumber: '10',
      instagram: undefined,
      facebook: undefined,
      twitter: undefined,
      username: undefined,
      teamId: 't1',
      state: undefined,
      photoUrl: 'https://example.com/p1.png',
      licenseNumber: 'LIC1'
    });
  });

  it('defaults optional fields when absent', () => {
    const result = mapApiPlayerToPlayerEntity({
      id: 'p2',
      name: 'Player B'
    });

    expect(result.shirtName).toBe('');
    expect(result.shirtNumber).toBe('');
    expect(result.teamId).toBe('');
    expect(result.photoUrl).toBe('');
    expect(result.licenseNumber).toBe('');
  });
});
