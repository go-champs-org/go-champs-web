import {
  ApiClockState,
  ApiTeam
} from '../../Shared/httpClient/scoreboardApiTypes';

export const teamScore = (teamState: ApiTeam) => {
  return teamState.total_player_stats.points || 0;
};

export const periodAndTime = (clockState: ApiClockState) => {
  return {
    period: clockState.period,
    time: clockState.time
  };
};
