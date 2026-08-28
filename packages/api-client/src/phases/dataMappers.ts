import {
  ApiDraw,
  ApiDrawMatch,
  ApiElimination,
  ApiEliminationStat,
  ApiEliminationTeamStat,
  ApiPhase,
  ApiPhaseType,
  ApiRankingCriteria
} from './apiTypes';

export interface DrawMatchEntity {
  id: string;
  firstTeamId: string;
  firstTeamPlaceholder: string;
  firstTeamScore: string;
  secondTeamId: string;
  secondTeamPlaceholder: string;
  secondTeamScore: string;
  name: string;
  info: string;
}

export interface DrawEntity {
  id: string;
  order: number;
  title: string;
  matches: DrawMatchEntity[];
}

export interface EliminationStatEntity {
  id: string;
  title: string;
  teamStatSource: string;
  rankingOrder: number;
  rankingCriteria: ApiRankingCriteria;
}

export interface EliminationTeamStatEntity {
  id: string;
  teamId: string;
  placeholder: string;
  stats: Record<string, number>;
  rankingCriteriaUsed: ApiRankingCriteria | null;
  rankingStatUsed: string;
}

export interface EliminationEntity {
  id: string;
  order: number;
  title: string;
  info: string;
  teamStats: EliminationTeamStatEntity[];
}

export interface PhaseEntity {
  id: string;
  title: string;
  type: ApiPhaseType;
  order: number;
  isInProgress: boolean;
  draws: DrawEntity[];
  eliminationStats: EliminationStatEntity[];
  eliminations: EliminationEntity[];
}

const mapApiDrawMatchToDrawMatchEntity = (
  apiDrawMatch: ApiDrawMatch
): DrawMatchEntity => ({
  id: apiDrawMatch.id,
  firstTeamId: apiDrawMatch.first_team_id || '',
  firstTeamPlaceholder: apiDrawMatch.first_team_placeholder || '',
  firstTeamScore: apiDrawMatch.first_team_score || '',
  secondTeamId: apiDrawMatch.second_team_id || '',
  secondTeamPlaceholder: apiDrawMatch.second_team_placeholder || '',
  secondTeamScore: apiDrawMatch.second_team_score || '',
  name: apiDrawMatch.name || '',
  info: apiDrawMatch.info || ''
});

const mapApiDrawToDrawEntity = (apiDraw: ApiDraw): DrawEntity => ({
  id: apiDraw.id,
  order: apiDraw.order,
  title: apiDraw.title || '',
  matches: apiDraw.matches.map(mapApiDrawMatchToDrawMatchEntity)
});

const mapApiEliminationStatToEntity = (
  apiStat: ApiEliminationStat
): EliminationStatEntity => ({
  id: apiStat.id,
  title: apiStat.title,
  teamStatSource: apiStat.team_stat_source || '',
  rankingOrder: apiStat.ranking_order || 0,
  rankingCriteria: apiStat.ranking_criteria || 'overall'
});

const mapApiEliminationTeamStatToEntity = (
  apiTeamStat: ApiEliminationTeamStat
): EliminationTeamStatEntity => ({
  id: apiTeamStat.id,
  teamId: apiTeamStat.team_id,
  placeholder: apiTeamStat.placeholder || '',
  stats: apiTeamStat.stats,
  rankingCriteriaUsed: apiTeamStat.ranking_criteria_used,
  rankingStatUsed: apiTeamStat.ranking_stat_used || ''
});

const mapApiEliminationToEntity = (
  apiElimination: ApiElimination
): EliminationEntity => ({
  id: apiElimination.id,
  order: apiElimination.order,
  title: apiElimination.title || '',
  info: apiElimination.info || '',
  teamStats: apiElimination.team_stats.map(mapApiEliminationTeamStatToEntity)
});

export const mapApiPhaseToPhaseEntity = (apiPhase: ApiPhase): PhaseEntity => ({
  id: apiPhase.id,
  title: apiPhase.title,
  type: apiPhase.type,
  order: apiPhase.order,
  isInProgress: apiPhase.is_in_progress,
  draws: (apiPhase.draws || []).map(mapApiDrawToDrawEntity),
  eliminationStats: (apiPhase.elimination_stats || []).map(
    mapApiEliminationStatToEntity
  ),
  eliminations: (apiPhase.eliminations || []).map(mapApiEliminationToEntity)
});
