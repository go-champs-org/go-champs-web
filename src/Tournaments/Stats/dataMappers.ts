import { ApiStat, ApiStatRequest } from '../../Shared/httpClient/apiTypes';
import { TournamentStatEntity } from './state';

export const mapApiStatToStatEntity = (
  apiStat: ApiStat
): TournamentStatEntity => ({
  id: apiStat.id,
  title: apiStat.title
});

export const mapStatEntityToApiStatRequest = (
  phase: TournamentStatEntity
): ApiStatRequest => ({
  tournament_stat: {
    id: phase.id,
    title: phase.title
  }
});
