import { ApiSport, ApiStatistic } from '../Shared/httpClient/apiTypes';
import { SportEntity, Statistic } from './state';

const mapApiStatisticTypeToStatisticType = (
  apiStatisticType: string
): 'logged' | 'calculated' =>
  apiStatisticType === 'logged' ? 'logged' : 'calculated';

const mapApiStatisticToStatisticEntity = (
  apiStatistic: ApiStatistic
): Statistic => ({
  name: apiStatistic.name,
  slug: apiStatistic.slug,
  type: mapApiStatisticTypeToStatisticType(apiStatistic.type)
});

export const mapApiSportToSportEntity = (apiSport: ApiSport): SportEntity => ({
  name: apiSport.name,
  slug: apiSport.slug,
  playerStatistics: apiSport.player_statistics
    ? apiSport.player_statistics.map(mapApiStatisticToStatisticEntity)
    : []
});
