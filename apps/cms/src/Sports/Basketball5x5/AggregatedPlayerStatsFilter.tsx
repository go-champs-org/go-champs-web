import React from 'react';
import { FiltersProps } from '../../AggregatedPlayerStats/Filters';
import { Scope } from '../state';
import { Trans, useTranslation } from 'react-i18next';
import StandaloneSelect, {
  SelectOptionType
} from '../../Shared/UI/Form/StandaloneSelect';
import { useLocation } from 'react-router-dom';

const SCOPE_URL_QUERY_PARAM = 'scope';
function AggregatedPlayerStatsFilter({
  onStatisticsScopeFilterChange
}: FiltersProps): React.ReactElement<FiltersProps> {
  const { t } = useTranslation();

  const location = useLocation();
  const scope =
    (new URLSearchParams(location.search).get(
      SCOPE_URL_QUERY_PARAM
    ) as Scope) || ('aggregate' as Scope);

  const scopeOptions: SelectOptionType[] = [
    { value: 'aggregate', label: t('perAggregation') },
    { value: 'per_game', label: t('perGame') }
  ];

  const handleScopeChange = (value: string) => {
    onStatisticsScopeFilterChange(value as Scope);
  };

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
                  <StandaloneSelect
                    options={scopeOptions}
                    onChange={handleScopeChange}
                    placeholder={t('selectScope')}
                    value={scope}
                  />
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
