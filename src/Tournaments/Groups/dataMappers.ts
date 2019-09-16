import { ApiGroup, ApiGroupRequest } from '../../Shared/httpClient/apiTypes';
import { TournamentGroupEntity } from './state';

export const mapApiGroupToGroupEntity = (
  apiGroup: ApiGroup
): TournamentGroupEntity => ({
  id: apiGroup.id,
  name: apiGroup.name
});

export const mapGroupEntityToApiGroupRequest = (
  phase: TournamentGroupEntity
): ApiGroupRequest => ({
  tournament_group: {
    id: phase.id,
    name: phase.name
  }
});
