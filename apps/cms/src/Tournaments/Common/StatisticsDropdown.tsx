import React from 'react';
import { MigratedRouteLink } from '../../Shared/UI/MigratedRouteLink';
import { Trans } from 'react-i18next';
import { TournamentEntity } from '../state';
import './StatisticsDropdown.scss';

interface StatisticsDropdownProps {
  hasSummaryStatistics: boolean;
  organizationSlug: string;
  tournament: TournamentEntity;
  tournamentSlug: string;
}

function StatisticsDropdown({
  hasSummaryStatistics,
  organizationSlug,
  tournamentSlug,
  tournament
}: StatisticsDropdownProps) {
  return (
    <div className="stats-dropdown dropdown is-right is-hoverable">
      <div className="dropdown-trigger">
        <button
          className="button is-rounded"
          aria-haspopup="true"
          aria-controls="dropdown-statistics"
        >
          <span className="icon">
            <i className="fas fa-table"></i>
          </span>

          <span>
            <Trans>statistics</Trans>
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>

      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {hasSummaryStatistics && (
            <MigratedRouteLink
              className="dropdown-item"
              to={`/${organizationSlug}/${tournamentSlug}/PlayerStatsSummary`}
            >
              <Trans>summary</Trans>
            </MigratedRouteLink>
          )}

          {hasSummaryStatistics && tournament.hasAggregatedPlayerStats && (
            <hr className="dropdown-divider" />
          )}

          {tournament.hasAggregatedPlayerStats && (
            <MigratedRouteLink
              className="dropdown-item"
              to={`/${organizationSlug}/${tournamentSlug}/PlayerStats`}
            >
              <Trans>advanced</Trans>
            </MigratedRouteLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatisticsDropdown;
