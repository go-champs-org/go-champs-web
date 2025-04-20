import { StatsLogRenderEntity } from '../PlayerStatsLog/View';
import {
  DEFAULT_TEAM_STATS_LOG,
  TeamStatsLogEntity,
  TeamStatsLogState
} from './state';

export const teamStatLogs = (state: TeamStatsLogState) =>
  Object.keys(state.teamStatsLogs).map(
    (key: string) => state.teamStatsLogs[key]
  );

export const statLogRendersByGameIdAndTeamId = (
  state: TeamStatsLogState,
  gameId: string,
  teamId: string
): StatsLogRenderEntity =>
  teamStatLogs(state)
    .filter(
      (teamStatsLog: TeamStatsLogEntity) =>
        teamStatsLog.gameId === gameId && teamStatsLog.teamId === teamId
    )
    .map(teamStatLogs => ({
      id: teamStatLogs.id,
      teamId: teamStatLogs.teamId,
      stats: teamStatLogs.stats
    }))[0] || DEFAULT_TEAM_STATS_LOG;
