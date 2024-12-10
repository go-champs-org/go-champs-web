import { Statistic } from '../Sports/state';
import { PlayerStatEntity } from './state';

export const playerStatThatContainsInStatistic = (statistics: Statistic[]) => (
  playerStat: PlayerStatEntity
) => statistics.some(statistic => statistic.slug === playerStat.slug);
