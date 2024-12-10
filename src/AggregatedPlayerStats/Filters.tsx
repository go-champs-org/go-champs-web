import React from 'react';
import { TournamentEntity } from '../Tournaments/state';
import { Statistic } from '../Sports/state';
import AggregatedPlayerStatsFilter from '../Sports/Basketball5x5/AggregatedPlayerStatsFilter';

export interface FiltersProps {
  tournament: TournamentEntity;
  onStatisticsFilterChange: (statistics: Statistic[]) => void;
}

const FiltersRegistry: { [key: string]: React.ComponentType<FiltersProps> } = {
  basketball_5x5: AggregatedPlayerStatsFilter
};

function Filters({ tournament, onStatisticsFilterChange }: FiltersProps) {
  const Filter = FiltersRegistry[tournament.sportSlug] || (() => <></>);

  return (
    <Filter
      tournament={tournament}
      onStatisticsFilterChange={onStatisticsFilterChange}
    />
  );
}

export default Filters;
