import {
  ApiPhaseMatchRound,
  ApiPhaseRound,
  ApiPhaseRoundRequest
} from '../../Shared/httpClient/apiTypes';
import { PhaseRoundEntity, RoundMatchEntity } from './state';

const mapApiPhaseMatchRoundToRoundMatch = (
  apiRoundMatch: ApiPhaseMatchRound
): RoundMatchEntity => ({
  id: apiRoundMatch.id,
  firstTeamId: apiRoundMatch.first_team_id,
  firstTeamParentMatchId: apiRoundMatch.first_team_parent_id,
  firstTeamPlaceholder: apiRoundMatch.first_team_placeholder,
  firstTeamScore: apiRoundMatch.first_team_score,
  secondTeamId: apiRoundMatch.second_team_id,
  secondTeamParentMatchId: apiRoundMatch.second_team_parent_id,
  secondTeamPlaceholder: apiRoundMatch.second_team_placeholder,
  secondTeamScore: apiRoundMatch.second_team_score
});

const mapRoundMatchToApiPhaseMatchRound = (
  roundMatch: RoundMatchEntity
): ApiPhaseMatchRound => ({
  id: roundMatch.id,
  first_team_id: roundMatch.firstTeamId,
  first_team_parent_id: roundMatch.firstTeamParentMatchId,
  first_team_placeholder: roundMatch.firstTeamPlaceholder,
  first_team_score: roundMatch.firstTeamScore,
  second_team_id: roundMatch.secondTeamId,
  second_team_parent_id: roundMatch.secondTeamParentMatchId,
  second_team_placeholder: roundMatch.secondTeamPlaceholder,
  second_team_score: roundMatch.secondTeamScore
});

export const mapApiPhaseRoundToRoundEntity = (
  apiRound: ApiPhaseRound
): PhaseRoundEntity => ({
  id: apiRound.id,
  matches: apiRound.matches.map(mapApiPhaseMatchRoundToRoundMatch),
  order: apiRound.order || 1,
  title: apiRound.title || ''
});

export const mapRoundEntityToApiPhaseRoundRequest = (
  phaseRound: PhaseRoundEntity
): ApiPhaseRoundRequest => ({
  phase_round: {
    id: phaseRound.id,
    matches: phaseRound.matches.map(mapRoundMatchToApiPhaseMatchRound),
    order: phaseRound.order || undefined,
    title: phaseRound.title
  }
});
