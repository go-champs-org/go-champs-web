import { ApiStat } from '../../Shared/httpClient/apiTypes';
import { PhaseEliminationStatEntity } from './state';

export const mapApiStatToPhaseEliminationStatEntity = (
  apiStat: ApiStat
): PhaseEliminationStatEntity => ({
  id: apiStat.id,
  title: apiStat.title
});
