import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { OfficialProfileEntity } from './state';
import PlayerPhotoPlaceholder from '../Players/PlayerPhotoPlaceholder.png';
import '../AthleteProfiles/Banner.scss';

function Banner({
  officialProfile
}: {
  officialProfile: OfficialProfileEntity;
}) {
  const imageSrc = officialProfile.photoUrl || PlayerPhotoPlaceholder;
  const profileUrl = `/Account/OfficialProfile/${officialProfile.username}`;

  return (
    <section className="athlete-profile-banner">
      <div className="body">
        <div className="container">
          <div className="columns">
            <div className="column is-3 has-text-centered">
              <img
                src={imageSrc}
                alt={`${officialProfile.name} profile`}
                className={officialProfile.photoUrl ? `photo custom` : 'photo'}
              />
            </div>
            <div className="column has-text-centered-mobile">
              <p className="name">{officialProfile.name}</p>

              {officialProfile.username && (
                <nav className="buttons">
                  <NavLink
                    exact
                    to={profileUrl}
                    className="button is-small"
                    activeClassName="is-link"
                  >
                    <Trans>home</Trans>
                  </NavLink>
                  <NavLink
                    to={`${profileUrl}/Tournaments`}
                    className="button is-small"
                    activeClassName="is-link"
                  >
                    <Trans>myTournaments</Trans>
                  </NavLink>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
