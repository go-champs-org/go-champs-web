import { ApiStatLeader, ApiStatLeaders } from './apiTypes';

export interface StatLeaderEntity {
  playerId: string;
  teamId: string;
  value: number;
  playerName: string;
  shirtNumber: string;
  photoUrl: string;
}

// The leaders of one stat, best first. `qualifier` is the minimum of each
// stat a player needed to be ranked (`{ game_played: 3 }`), null for totals.
export interface StatLeadersEntity {
  statKey: string;
  qualifier: Record<string, number> | null;
  leaders: StatLeaderEntity[];
}

const mapApiStatLeaderToEntity = (
  apiLeader: ApiStatLeader
): StatLeaderEntity => ({
  playerId: apiLeader.player_id,
  teamId: apiLeader.team_id || '',
  value: apiLeader.value,
  playerName: apiLeader.player.name,
  shirtNumber: apiLeader.player.shirt_number || '',
  photoUrl: apiLeader.player.photo_url || ''
});

export const mapApiStatLeadersToEntity = (
  apiStatLeaders: ApiStatLeaders
): StatLeadersEntity => ({
  statKey: apiStatLeaders.stat_key,
  qualifier: apiStatLeaders.qualifier,
  leaders: apiStatLeaders.leaders.map(mapApiStatLeaderToEntity)
});
