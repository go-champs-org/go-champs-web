import { ApiTeam } from '../../Shared/httpClient/scoreboardApiTypes';

export const teamScore = (teamState: ApiTeam) => {
  return teamState.total_player_stats.points || 0;
};
