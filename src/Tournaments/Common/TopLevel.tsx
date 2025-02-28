import React from 'react';
import { Link } from 'react-router-dom';
import { TournamentEntity } from '../state';
import Shimmer from '../../Shared/UI/Shimmer';
import './TopLevel.scss';
import { OrganizationEntity } from '../../Organizations/state';
import { AuthenticatedAndMemberWrapper } from '../../Shared/UI/AdminWrapper';
import { Trans } from 'react-i18next';
import StatisticsDropdown from './StatisticsDropdown';
import QRCode from './QRCode';

export const LoadingTopLevel: React.FC = () => (
  <nav className="level">
    <div className="level-left">
      <div className="level-item">
        <Shimmer>
          <div
            style={{
              height: '26px',
              marginTop: '13px',
              width: '310px'
            }}
          ></div>
        </Shimmer>
      </div>
    </div>
  </nav>
);

const TopLevel: React.FC<{
  hasSummaryStatistics: boolean;
  organization: OrganizationEntity;
  organizationSlug: string;
  tournament: TournamentEntity;
  tournamentSlug: string;
}> = ({
  hasSummaryStatistics,
  organization,
  organizationSlug,
  tournament,
  tournamentSlug
}) => {
  const shouldShowStatistics =
    tournament.hasAggregatedPlayerStats || hasSummaryStatistics;
  return (
    <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <div className="columns is-multiline is-gapless">
            <div className="column is-12">
              <Link to={`/${organizationSlug}/${tournamentSlug}`}>
                <h1 className="title tournament-link">{tournament.name}</h1>
              </Link>
            </div>

            <div className="column is-12">
              <Link to={`/${organizationSlug}`}>
                <em className="organization-link">{organization.name}</em>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="level-right">
        <div className="level-item">
          {tournament.siteUrl && (
            <a
              href={tournament.siteUrl}
              className="has-text-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="icon is-medium social-icon"
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-external-link-alt fa-lg"></i>
              </span>
            </a>
          )}

          {tournament.instagram && (
            <a
              href={`https://www.instagram.com/${tournament.instagram}`}
              className="has-text-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon is-medium social-icon">
                <i className="fab fa-instagram fa-lg"></i>
              </span>
            </a>
          )}

          {tournament.facebook && (
            <a
              href={`https://www.facebook.com/${tournament.facebook}`}
              className="has-text-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon is-medium social-icon">
                <i className="fab fa-facebook fa-lg"></i>
              </span>
            </a>
          )}

          {tournament.twitter && (
            <a
              href={`https://twitter.com/${tournament.twitter}`}
              className="has-text-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon is-medium social-icon">
                <i className="fab fa-twitter fa-lg"></i>
              </span>
            </a>
          )}

          <QRCode
            organizationSlug={organizationSlug}
            tournamentName={tournament.name}
            tournamentSlug={tournamentSlug}
          ></QRCode>
        </div>

        {shouldShowStatistics && (
          <div className="level-item">
            <StatisticsDropdown
              hasSummaryStatistics={hasSummaryStatistics}
              organizationSlug={organizationSlug}
              tournamentSlug={tournamentSlug}
              tournament={tournament}
            />
          </div>
        )}

        <AuthenticatedAndMemberWrapper organization={organization}>
          <div className="level-item">
            <Link to={`/${organizationSlug}/${tournamentSlug}/Manage`}>
              <button className="button is-rounded">
                <span className="icon is-medium">
                  <i className="fas fa-cog"></i>
                </span>

                <span>
                  <Trans>manage</Trans>
                </span>
              </button>
            </Link>
          </div>
        </AuthenticatedAndMemberWrapper>
      </div>
    </nav>
  );
};

export default TopLevel;
