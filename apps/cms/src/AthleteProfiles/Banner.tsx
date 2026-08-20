import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { AthleteProfileEntity } from './state';
import PlayerPhotoPlaceholder from '../Players/PlayerPhotoPlaceholder.png';
import ShareButton from '../Shared/UI/ShareButton';
import './Banner.scss';

interface SocialNetworkLinkProps {
  handle: string;
  icon: string;
  url: string;
}

function SocialNetworkLink({ handle, icon, url }: SocialNetworkLinkProps) {
  return (
    <a
      href={`${url}/${handle}`}
      target="_blank"
      rel="noopener noreferrer"
      className="athlete-profile-banner__social-link"
    >
      <i className={icon} />
    </a>
  );
}

function Banner({ athleteProfile }: { athleteProfile: AthleteProfileEntity }) {
  const imageSrc = athleteProfile.photoUrl || PlayerPhotoPlaceholder;
  const profileUrl = `/Account/Profile/${athleteProfile.username}`;
  const tournamentsCount = athleteProfile.tournaments
    ? athleteProfile.tournaments.length
    : 0;
  const sportsCount = athleteProfile.careerStats
    ? athleteProfile.careerStats.length
    : 0;
  const hasSocialNetworks = !!(
    athleteProfile.facebook ||
    athleteProfile.instagram ||
    athleteProfile.twitter
  );

  // The story image is shared through the device's own share sheet, which only
  // mobile browsers offer.
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  return (
    <section className="athlete-profile-banner">
      <div className="athlete-profile-banner__accessory" aria-hidden="true" />

      <div className="athlete-profile-banner__content">
        <header className="athlete-profile-banner__header">
          <p className="athlete-profile-banner__overline">
            <Trans>athlete</Trans>
          </p>
          {athleteProfile.username && (
            <p className="athlete-profile-banner__username notranslate">
              @{athleteProfile.username}
            </p>
          )}
        </header>

        <div className="athlete-profile-banner__identity">
          <img
            src={imageSrc}
            alt={`${athleteProfile.name} profile`}
            className="athlete-profile-banner__photo"
          />

          <div className="athlete-profile-banner__identity-body">
            <p className="athlete-profile-banner__name">
              {athleteProfile.name}
            </p>

            <div className="athlete-profile-banner__details">
              <div className="athlete-profile-banner__details-main">
                {(hasSocialNetworks || isMobile) && (
                  <div className="athlete-profile-banner__meta">
                    {athleteProfile.instagram && (
                      <SocialNetworkLink
                        handle={athleteProfile.instagram}
                        icon="fab fa-instagram"
                        url="https://instagram.com"
                      />
                    )}
                    {athleteProfile.twitter && (
                      <SocialNetworkLink
                        handle={athleteProfile.twitter}
                        icon="fab fa-twitter"
                        url="https://twitter.com"
                      />
                    )}
                    {athleteProfile.facebook && (
                      <SocialNetworkLink
                        handle={athleteProfile.facebook}
                        icon="fab fa-facebook"
                        url="https://facebook.com"
                      />
                    )}
                    {isMobile && (
                      <ShareButton athleteProfile={athleteProfile} />
                    )}
                  </div>
                )}

                {athleteProfile.username && (
                  <nav className="athlete-profile-banner__nav">
                    <NavLink
                      exact
                      to={profileUrl}
                      className="button athlete-profile-banner__nav-link"
                      activeClassName="is-active"
                    >
                      <Trans>home</Trans>
                    </NavLink>
                    <NavLink
                      to={`${profileUrl}/Tournaments`}
                      className="button athlete-profile-banner__nav-link"
                      activeClassName="is-active"
                    >
                      <Trans>myTournaments</Trans>
                    </NavLink>
                  </nav>
                )}
              </div>

              <div className="athlete-profile-banner__highlights">
                <p className="athlete-profile-banner__highlights-title">
                  <Trans>athleteHighlights</Trans>
                </p>

                <div className="athlete-profile-banner__highlight-grid">
                  <div className="athlete-profile-banner__highlight">
                    <p className="athlete-profile-banner__highlight-value">
                      {tournamentsCount}
                    </p>
                    <p className="athlete-profile-banner__highlight-label">
                      <Trans>tournaments</Trans>
                    </p>
                  </div>

                  <div className="athlete-profile-banner__highlight">
                    <p className="athlete-profile-banner__highlight-value">
                      {sportsCount}
                    </p>
                    <p className="athlete-profile-banner__highlight-label">
                      <Trans>sportsPlayed</Trans>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
