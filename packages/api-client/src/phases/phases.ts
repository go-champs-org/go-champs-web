import { getApiHost } from '../env';
import httpClient from '../httpClient';
import { mapApiPhaseToPhaseEntity, PhaseEntity } from './dataMappers';
import { ApiPhaseResponse } from './apiTypes';
import { GameEntity, mapApiGameToGameEntity } from '../games/dataMappers';
import { ApiGamesResponse } from '../games/apiTypes';

export const getPhase = async (phaseId: string): Promise<PhaseEntity> => {
  const url = new URL(`v1/phases/${phaseId}`, getApiHost());
  const { data } = await httpClient.get<ApiPhaseResponse>(url.toString());
  return mapApiPhaseToPhaseEntity(data);
};

export const getGamesByPhaseId = async (phaseId: string): Promise<GameEntity[]> => {
  const url = new URL('v1/games', getApiHost());
  url.searchParams.set('where[phase_id]', phaseId);
  const { data } = await httpClient.get<ApiGamesResponse>(url.toString());
  return data.map(mapApiGameToGameEntity);
};
