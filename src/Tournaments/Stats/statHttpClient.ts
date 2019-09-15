import {
  ApiStat,
  ApiStatRequest,
  ApiStatResponse
} from '../../Shared/httpClient/apiTypes';
import httpClient from '../../Shared/httpClient/httpClient';
import { TournamentStatEntity } from './state';

const PHASE_API = 'https://yochamps-api.herokuapp.com/api/phases';

const phaseStatsApi = (phaseId: string) => `${PHASE_API}/${phaseId}/stats`;

export const mapApiStatToStatEntity = (
  apiStat: ApiStat
): TournamentStatEntity => ({
  id: apiStat.id,
  title: apiStat.title
});

const mapStatEntityToApiStatRequest = (
  phase: TournamentStatEntity
): ApiStatRequest => ({
  tournament_stat: {
    id: phase.id,
    title: phase.title
  }
});

const deleteRequest = (
  phaseId: string,
  tournamentPhaseId: string
): Promise<string> => {
  const url = `${phaseStatsApi(phaseId)}/${tournamentPhaseId}`;

  return httpClient.delete(url);
};

const patch = async (
  phaseId: string,
  tournamentStat: TournamentStatEntity
): Promise<TournamentStatEntity> => {
  const url = `${phaseStatsApi(phaseId)}/${tournamentStat.id}`;
  const body = mapStatEntityToApiStatRequest(tournamentStat);

  const { data } = await httpClient.patch<ApiStatRequest, ApiStatResponse>(
    url,
    body
  );
  return mapApiStatToStatEntity(data);
};

const post = async (
  phaseId: string,
  tournamentStat: TournamentStatEntity
): Promise<TournamentStatEntity> => {
  const url = `${phaseStatsApi(phaseId)}`;
  const body = mapStatEntityToApiStatRequest(tournamentStat);

  const { data } = await httpClient.post<ApiStatRequest, ApiStatResponse>(
    url,
    body
  );
  return mapApiStatToStatEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
