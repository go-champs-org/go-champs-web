import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { OfficialProfileEntity } from './state';
import PlayerPhotoPlaceholder from '../Players/PlayerPhotoPlaceholder.png';
import './Banner.scss';

function Banner({
  officialProfile
}: {
  officialProfile: OfficialProfileEntity;
}) {
  const imageSrc = officialProfile.photoUrl || PlayerPhotoPlaceholder;
  const profileUrl = `/Account/OfficialProfile/${officialProfile.username}`;
  const tournamentsCount = officialProfile.tournaments
    ? officialProfile.tournaments.length
    : 0;
  const pendingInvitesCount = officialProfile.pendingInvites
    ? officialProfile.pendingInvites.length
    : 0;

  return (
    <section className="official-profile-banner">
      <div className="official-profile-banner__accessory" aria-hidden="true" />

      <div className="official-profile-banner__content">
        <header className="official-profile-banner__header">
          <p className="official-profile-banner__overline">
            <Trans>official</Trans>
          </p>
          {officialProfile.username && (
            <p className="official-profile-banner__username notranslate">
              @{officialProfile.username}
            </p>
          )}
        </header>

        <div className="official-profile-banner__identity">
          <img
            src={imageSrc}
            alt={`${officialProfile.name} profile`}
            className="official-profile-banner__photo"
          />

          <div className="official-profile-banner__identity-body">
            <p className="official-profile-banner__name">
              {officialProfile.name}
            </p>

            <div className="official-profile-banner__details">
              <div className="official-profile-banner__details-main">
                <div className="official-profile-banner__meta">
                  {officialProfile.category && (
                    <span className="official-profile-banner__badge">
                      {officialProfile.category}
                    </span>
                  )}
                  {officialProfile.licenseNumber && (
                    <span className="official-profile-banner__meta-item">
                      <Trans>licenseNumber</Trans>:{' '}
                      {officialProfile.licenseNumber}
                    </span>
                  )}
                </div>

                {officialProfile.username && (
                  <nav className="official-profile-banner__nav">
                    <NavLink
                      exact
                      to={profileUrl}
                      className="button official-profile-banner__nav-link"
                      activeClassName="is-active"
                    >
                      <Trans>home</Trans>
                    </NavLink>
                    <NavLink
                      to={`${profileUrl}/Tournaments`}
                      className="button official-profile-banner__nav-link"
                      activeClassName="is-active"
                    >
                      <Trans>myTournaments</Trans>
                    </NavLink>
                  </nav>
                )}
              </div>

              <div className="official-profile-banner__highlights">
                <p className="official-profile-banner__highlights-title">
                  <Trans>officialHighlights</Trans>
                </p>

                <div className="official-profile-banner__highlight-grid">
                  <div className="official-profile-banner__highlight">
                    <p className="official-profile-banner__highlight-value">
                      {tournamentsCount}
                    </p>
                    <p className="official-profile-banner__highlight-label">
                      <Trans>tournaments</Trans>
                    </p>
                  </div>

                  <div className="official-profile-banner__highlight">
                    <p className="official-profile-banner__highlight-value">
                      {pendingInvitesCount}
                    </p>
                    <p className="official-profile-banner__highlight-label">
                      <Trans>pendingInvites</Trans>
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
