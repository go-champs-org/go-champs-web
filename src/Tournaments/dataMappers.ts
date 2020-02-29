import {
  ApiTournament,
  ApiTournamentRequest,
  ApiTournamentWithDependecies,
  ApiPhase
} from '../Shared/httpClient/apiTypes';
import { TournamentEntity } from './state';

export const mapApiTournamentToTournamentEntity = (
  apiTournament: ApiTournament
): TournamentEntity => ({
  id: apiTournament.id,
  name: apiTournament.name,
  slug: apiTournament.slug
});

export const mapTournamentEntityToApiTournamentRequest = (
  tournament: TournamentEntity,
  organizationId: string
): ApiTournamentRequest => ({
  tournament: {
    id: tournament.id,
    name: tournament.name,
    slug: tournament.slug,
    organization_id: organizationId
  }
});

export const currentPhaseId = (tournament: ApiTournamentWithDependecies) => {
  const currentPhase = tournament.phases.find(
    (phase: ApiPhase) => phase.is_in_progress
  );

  if (currentPhase) {
    return currentPhase.id;
  }
  if (tournament.phases.length > 0) {
    return tournament.phases[0].id;
  }
  return '';
};
