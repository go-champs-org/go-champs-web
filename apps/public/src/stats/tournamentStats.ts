import {
  playerStatThatIsVisible,
  type AggregatedPlayerStatsLogEntity,
  type FixedPlayerStatsRecordEntity,
  type FixedPlayerStatsTableEntity,
  type PlayerEntity,
  type PlayerStatEntity
} from '@gochamps/api-client';
import type { TeamEntity } from '@gochamps/domain-types';
import { rosterStatRows, type RosterStatRow } from './rosterStats';

export interface TournamentStatRow extends RosterStatRow {
  teamName: string;
  teamId: string;
}

const teamNameById = (teams: TeamEntity[]): Map<string, string> =>
  new Map(teams.map(team => [team.id, team.name]));

// Unlike the team page's roster table — which lists every player on the
// roster, stats or not, because a roster is what that page is — a
// tournament-wide leaderboard only ever lists players who actually have a
// recorded stat. A 400-player tournament with a handful of participants
// would otherwise render hundreds of all-dash rows for nothing.
export const tournamentStatRows = (
  players: PlayerEntity[],
  statsLogs: AggregatedPlayerStatsLogEntity[],
  teams: TeamEntity[]
): TournamentStatRow[] => {
  const teamNames = teamNameById(teams);
  const playerTeamId = new Map(players.map(player => [player.id, player.teamId]));
  const playersWithStats = new Set(statsLogs.map(statsLog => statsLog.playerId));

  return rosterStatRows(
    players.filter(player => playersWithStats.has(player.id)),
    statsLogs
  ).map(row => {
    const teamId = playerTeamId.get(row.playerId) || '';

    return {
      ...row,
      teamName: teamNames.get(teamId) || '',
      teamId
    };
  });
};

// Keeps the API's rank order, unlike `tournamentStatRows`, which orders by
// roster instead.
export const tournamentStatRowsInStatsOrder = (
  players: PlayerEntity[],
  statsLogs: AggregatedPlayerStatsLogEntity[],
  teams: TeamEntity[]
): TournamentStatRow[] => {
  const teamNames = teamNameById(teams);
  const playersById = new Map(players.map(player => [player.id, player]));

  return statsLogs
    .filter(statsLog => playersById.has(statsLog.playerId))
    .map(statsLog => {
      const player = playersById.get(statsLog.playerId) as PlayerEntity;

      return {
        playerId: player.id,
        name: player.name,
        shirtNumber: player.shirtNumber,
        stats: statsLog.stats,
        teamName: teamNames.get(player.teamId) || '',
        teamId: player.teamId
      };
    });
};

export interface FixedStatsEntryRow {
  id: string;
  playerId: string;
  playerName: string;
  teamName: string;
  teamId: string;
  value: string;
}

export interface FixedStatsTableRow {
  id: string;
  title: string;
  entries: FixedStatsEntryRow[];
}

const playerById = (players: PlayerEntity[]): Map<string, PlayerEntity> =>
  new Map(players.map(player => [player.id, player]));

// A stale entry — its player is no longer on the roster — resolves to blank
// fields across the board rather than each caller null-checking separately.
const emptyFixedStatsPlayer = { name: '', teamId: '' };

const fixedStatsEntryRow = (
  entry: FixedPlayerStatsRecordEntity,
  players: Map<string, PlayerEntity>,
  teamNames: Map<string, string>
): FixedStatsEntryRow => {
  const player = players.get(entry.playerId) || emptyFixedStatsPlayer;

  return {
    id: entry.id,
    playerId: entry.playerId,
    playerName: player.name,
    teamName: teamNames.get(player.teamId) || '',
    teamId: player.teamId,
    value: entry.value
  };
};

// Each leaderboard card resolves its title off the tournament's own
// statistics (keyed by id, despite `PlayerStatEntity.id` reading like a slug —
// apps/cms/src/Tournaments/selectors.ts's `tournamentPlayerStatsMapBySlug`
// keys the same way) and its ranked entries off the tournament's roster, the
// same join `tournamentStatRows` already does above.
//
// Only public statistics resolve a title: a fixed table built on a private
// one (`disqualifications`, `minutes_played`, ...) is left off this list
// entirely, not shown with a blank title — a curated leaderboard is still
// the values it ranks, and those must never reach the public site either.
export const fixedStatsTableRows = (
  tables: FixedPlayerStatsTableEntity[],
  playerStats: PlayerStatEntity[],
  players: PlayerEntity[],
  teams: TeamEntity[]
): FixedStatsTableRow[] => {
  const teamNames = teamNameById(teams);
  const titleByStatId = new Map(
    playerStats
      .filter(playerStatThatIsVisible)
      .map(playerStat => [playerStat.id, playerStat.title])
  );
  const playersById = playerById(players);

  return tables
    .filter(table => titleByStatId.has(table.statId))
    .map(table => ({
      id: table.id,
      title: titleByStatId.get(table.statId) || '',
      entries: table.playerStats.map(entry =>
        fixedStatsEntryRow(entry, playersById, teamNames)
      )
    }));
};
