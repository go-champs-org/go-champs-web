import React from 'react';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { TournamentEntity } from '../state';

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
    <div className="dropdown is-right is-hoverable">
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
            <Link
              to={`/${organizationSlug}/${tournamentSlug}/PlayerStatsSummary`}
            >
              <Trans>summary</Trans>
            </Link>
          )}

          {hasSummaryStatistics && tournament.hasAggregatedPlayerStats && (
            <hr className="dropdown-divider" />
          )}

          {tournament.hasAggregatedPlayerStats && (
            <Link to={`/${organizationSlug}/${tournamentSlug}/PlayerStats`}>
              <Trans>advanced</Trans>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatisticsDropdown;
