import React from 'react';
import { TournamentEntity } from '../Tournaments/state';
import { Scope } from '../Sports/state';
import AggregatedPlayerStatsFilter from '../Sports/Basketball5x5/AggregatedPlayerStatsFilter';

export interface FiltersProps {
  tournament: TournamentEntity;
  onStatisticsScopeFilterChange: (scope: Scope) => void;
}

const FiltersRegistry: { [key: string]: React.ComponentType<FiltersProps> } = {
  basketball_5x5: AggregatedPlayerStatsFilter
};

function Filters({ tournament, onStatisticsScopeFilterChange }: FiltersProps) {
  const Filter = FiltersRegistry[tournament.sportSlug] || (() => <></>);

  return (
    <Filter
      tournament={tournament}
      onStatisticsScopeFilterChange={onStatisticsScopeFilterChange}
    />
  );
}

export default Filters;
