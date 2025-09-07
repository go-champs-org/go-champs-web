import {
  RequestFilter,
  ExtendedRequestFilter,
  mapRequestFilterToQueryString
} from './requestFilter';

describe('RequestFilter', () => {
  describe('mapRequestFilterToQueryString', () => {
    it('converts empty filter to empty string', () => {
      const filter: RequestFilter = {};
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe('');
    });

    it('converts single filter to query string', () => {
      const filter: RequestFilter = { team_id: 'team1' };
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe('where[team_id]=team1');
    });

    it('converts multiple filters to query string with ampersand separator', () => {
      const filter: RequestFilter = {
        team_id: 'team1',
        tournament_id: 'tournament1'
      };
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe(
        'where[team_id]=team1&where[tournament_id]=tournament1'
      );
    });

    it('handles filters with special characters', () => {
      const filter: RequestFilter = {
        name: 'Team A & B',
        description: 'Test@Example.com'
      };
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe(
        'where[name]=Team A & B&where[description]=Test@Example.com'
      );
    });

    it('converts empty extended filter to empty string', () => {
      const filter: ExtendedRequestFilter = {};
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe('');
    });

    it('converts regular filters without OR conditions', () => {
      const filter: ExtendedRequestFilter = {
        tournament_id: 'tournament1',
        phase_id: 'phase1'
      };
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe(
        'where[tournament_id]=tournament1&where[phase_id]=phase1'
      );
    });

    it('converts single OR condition', () => {
      const filter: ExtendedRequestFilter = {
        or: [{ home_team_id: 'team1' }]
      };
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe('where[or][0][home_team_id]=team1');
    });

    it('converts multiple OR conditions', () => {
      const filter: ExtendedRequestFilter = {
        or: [{ home_team_id: 'team1' }, { away_team_id: 'team1' }]
      };
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe(
        'where[or][0][home_team_id]=team1&where[or][1][away_team_id]=team1'
      );
    });

    it('converts OR conditions with multiple fields per condition', () => {
      const filter: ExtendedRequestFilter = {
        or: [
          { home_team_id: 'team1', tournament_id: 'tournament1' },
          { away_team_id: 'team1', tournament_id: 'tournament1' }
        ]
      };
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe(
        'where[or][0][home_team_id]=team1&where[or][0][tournament_id]=tournament1&where[or][1][away_team_id]=team1&where[or][1][tournament_id]=tournament1'
      );
    });

    it('combines regular filters with OR conditions', () => {
      const filter: ExtendedRequestFilter = {
        tournament_id: 'tournament1',
        phase_id: 'phase1',
        or: [{ home_team_id: 'team1' }, { away_team_id: 'team1' }]
      };
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe(
        'where[tournament_id]=tournament1&where[phase_id]=phase1&where[or][0][home_team_id]=team1&where[or][1][away_team_id]=team1'
      );
    });

    it('handles the specific use case of gamesByAwayTeamIdOrHomeTeamId', () => {
      const filter: ExtendedRequestFilter = {
        or: [{ home_team_id: 'team1' }, { away_team_id: 'team1' }]
      };
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe(
        'where[or][0][home_team_id]=team1&where[or][1][away_team_id]=team1'
      );
    });

    it('handles empty OR array', () => {
      const filter: ExtendedRequestFilter = {
        tournament_id: 'tournament1',
        or: []
      };
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe('where[tournament_id]=tournament1');
    });

    it('handles OR conditions with special characters', () => {
      const filter: ExtendedRequestFilter = {
        or: [
          { team_name: 'Team A & B' },
          { team_description: 'Test@Example.com' }
        ]
      };
      const result = mapRequestFilterToQueryString(filter);
      expect(result).toBe(
        'where[or][0][team_name]=Team A & B&where[or][1][team_description]=Test@Example.com'
      );
    });
  });
});
