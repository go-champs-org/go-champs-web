import {
  ApiPhaseStandings,
  ApiPhaseStandingsRequest,
  ApiPhaseStandingsTeamStat
} from '../../Shared/httpClient/apiTypes';
import { PhaseStandingsEntity, PhaseStandingsTeamStatEntity } from './state';

const mapApiPhaseStandingsTeamStatToTeamStat = (
  apiTeamStats: ApiPhaseStandingsTeamStat
): PhaseStandingsTeamStatEntity => ({
  id: apiTeamStats.id,
  stats: apiTeamStats.stats,
  teamId: apiTeamStats.team_id
});

const mapTeamStatToApiPhaseStandingsTeamStat = (
  teamStats: PhaseStandingsTeamStatEntity
): ApiPhaseStandingsTeamStat => ({
  id: teamStats.id,
  stats: teamStats.stats,
  team_id: teamStats.teamId
});

export const mapApiPhaseStandingsToStandingsEntity = (
  apiStandings: ApiPhaseStandings
): PhaseStandingsEntity => ({
  id: apiStandings.id,
  title: apiStandings.title || '',
  teamStats: apiStandings.team_stats.map(mapApiPhaseStandingsTeamStatToTeamStat)
});

export const mapStandingsEntityToApiPhaseStandingsRequest = (
  phaseStandings: PhaseStandingsEntity
): ApiPhaseStandingsRequest => ({
  phase_standings: {
    id: phaseStandings.id,
    title: phaseStandings.title,
    team_stats: phaseStandings.teamStats.map(
      mapTeamStatToApiPhaseStandingsTeamStat
    )
  }
});
