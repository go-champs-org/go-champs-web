import type { TournamentWithTeamsEntity } from '@gochamps/api-client';
import { organizationIdOf } from './organizationIdOf';

describe('organizationIdOf', () => {
  it('returns the id of the tournament organization', () => {
    const tournament = {
      organization: { id: 'org1' }
    } as TournamentWithTeamsEntity;

    expect(organizationIdOf(tournament)).toEqual('org1');
  });

  it('returns an empty id when there is no tournament', () => {
    expect(organizationIdOf(null)).toEqual('');
  });
});
