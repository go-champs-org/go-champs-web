import type {
  AggregatedPlayerStatsLogEntity,
  FixedPlayerStatsRecordEntity,
  FixedPlayerStatsTableEntity,
  PlayerEntity,
  PlayerStatEntity
} from '@gochamps/api-client';
import type { TeamEntity } from '@gochamps/domain-types';
import { rosterStatRows, type RosterStatRow } from './rosterStats';

export interface TournamentStatRow extends RosterStatRow {
  teamName: string;
}

const teamNameById = (teams: TeamEntity[]): Map<string, string> =>
  new Map(teams.map(team => [team.id, team.name]));

// The tournament-wide table lists every player in the tournament, same "roster
// is what the page lists, not the stats endpoint" principle the team page's
// table already encodes — reused rather than duplicated here.
export const tournamentStatRows = (
  players: PlayerEntity[],
  statsLogs: AggregatedPlayerStatsLogEntity[],
  teams: TeamEntity[]
): TournamentStatRow[] => {
  const teamNames = teamNameById(teams);
  const playerTeamId = new Map(players.map(player => [player.id, player.teamId]));

  return rosterStatRows(players, statsLogs).map(row => ({
    ...row,
    teamName: teamNames.get(playerTeamId.get(row.playerId) || '') || ''
  }));
};

export interface FixedStatsEntryRow {
  playerId: string;
  playerName: string;
  teamName: string;
  value: string;
}

export interface FixedStatsTableRow {
  id: string;
  title: string;
  entries: FixedStatsEntryRow[];
}

const fixedStatsEntryRow = (
  entry: FixedPlayerStatsRecordEntity,
  players: PlayerEntity[],
  teamNames: Map<string, string>
): FixedStatsEntryRow => {
  const player = players.find(candidate => candidate.id === entry.playerId);

  return {
    playerId: entry.playerId,
    playerName: player ? player.name : '',
    teamName: player ? teamNames.get(player.teamId) || '' : '',
    value: entry.value
  };
};

// Each leaderboard card resolves its title off the tournament's own
// statistics (keyed by id, despite `PlayerStatEntity.id` reading like a slug —
// apps/cms/src/Tournaments/selectors.ts's `tournamentPlayerStatsMapBySlug`
// keys the same way) and its ranked entries off the tournament's roster, the
// same join `tournamentStatRows` already does above.
export const fixedStatsTableRows = (
  tables: FixedPlayerStatsTableEntity[],
  playerStats: PlayerStatEntity[],
  players: PlayerEntity[],
  teams: TeamEntity[]
): FixedStatsTableRow[] => {
  const teamNames = teamNameById(teams);
  const titleByStatId = new Map(
    playerStats.map(playerStat => [playerStat.id, playerStat.title])
  );

  return tables.map(table => ({
    id: table.id,
    title: titleByStatId.get(table.statId) || '',
    entries: table.playerStats.map(entry =>
      fixedStatsEntryRow(entry, players, teamNames)
    )
  }));
};
