import React from 'react';
import { FiltersProps } from '../../AggregatedPlayerStats/Filters';
import { Scope } from '../state';

function AggregatedPlayerStatsFilter({
  onStatisticsScopeFilterChange
}: FiltersProps): React.ReactElement<FiltersProps> {
  const onScopeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatisticsScopeFilterChange(event.target.value as Scope);
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h3 className="title is-6">Filters</h3>

          <div className="field is-horizontal">
            <div className="field-body" style={{ flexGrow: 'unset' }}>
              <div className="field">
                <label className="label">scope</label>
                <div className="control">
                  <div className="select">
                    <select onChange={onScopeChange}>
                      <option value="aggregate">totals</option>
                      <option value="per_game">per game</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AggregatedPlayerStatsFilter;
