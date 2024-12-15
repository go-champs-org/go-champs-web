import React from 'react';
import { FiltersProps } from '../../AggregatedPlayerStats/Filters';
import { Scope } from '../state';
import { Trans, useTranslation } from 'react-i18next';

function AggregatedPlayerStatsFilter({
  onStatisticsScopeFilterChange
}: FiltersProps): React.ReactElement<FiltersProps> {
  const onScopeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatisticsScopeFilterChange(event.target.value as Scope);
  };
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h3 className="title is-6">
            <Trans>filters</Trans>
          </h3>

          <div className="field is-horizontal">
            <div className="field-body" style={{ flexGrow: 'unset' }}>
              <div className="field">
                <label className="yarn lintlabel">
                  <Trans>scope</Trans>
                </label>
                <div className="control">
                  <div className="select">
                    <select onChange={onScopeChange}>
                      <option value="aggregate">{t('perAggregation')}</option>
                      <option value="per_game">{t('perGame')}</option>
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
