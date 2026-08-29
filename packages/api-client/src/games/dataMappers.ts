import { TeamEntity } from '@gochamps/domain-types';
import { mapApiTeamToTeamEntity } from '../teams/dataMappers';
import { ApiGame, ApiGameAssetType } from './apiTypes';

export interface GameAssetEntity {
  id: string;
  type: ApiGameAssetType;
  url: string;
}

const DEFAULT_TEAM: TeamEntity = {
  id: '',
  name: '',
  logoUrl: '',
  triCode: '',
  primaryColor: '',
  coaches: []
};

export interface GameEntity {
  id: string;
  assets: GameAssetEntity[];
  awayPlaceholder: string;
  awayScore: number;
  awayTeam: TeamEntity;
  datetime: string;
  homePlaceholder: string;
  homeScore: number;
  homeTeam: TeamEntity;
  info: string;
  isFinished: boolean;
  location: string;
  city: string;
  number: string;
  phaseId: string;
  youTubeCode: string;
  liveState: string;
  resultType: string;
}

export const mapApiGameToGameEntity = (apiGame: ApiGame): GameEntity => ({
  id: apiGame.id,
  assets: (apiGame.assets || []).map(asset => ({
    id: asset.id || '',
    type: asset.type,
    url: asset.url
  })),
  awayPlaceholder: apiGame.away_placeholder || '',
  awayScore: apiGame.away_score,
  awayTeam: apiGame.away_team ? mapApiTeamToTeamEntity(apiGame.away_team) : DEFAULT_TEAM,
  datetime: apiGame.datetime || '',
  homePlaceholder: apiGame.home_placeholder || '',
  homeScore: apiGame.home_score,
  homeTeam: apiGame.home_team ? mapApiTeamToTeamEntity(apiGame.home_team) : DEFAULT_TEAM,
  info: apiGame.info || '',
  isFinished: apiGame.is_finished,
  location: apiGame.location || '',
  city: apiGame.city || '',
  number: apiGame.number || '',
  phaseId: apiGame.phase_id,
  youTubeCode: apiGame.youtube_code || '',
  liveState: apiGame.live_state || '',
  resultType: apiGame.result_type || ''
});
