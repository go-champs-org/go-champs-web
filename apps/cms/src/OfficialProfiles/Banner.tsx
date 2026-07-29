import React from 'react';
import { OfficialProfileEntity } from './state';
import PlayerPhotoPlaceholder from '../Players/PlayerPhotoPlaceholder.png';
import '../AthleteProfiles/Banner.scss';

function Banner({
  officialProfile
}: {
  officialProfile: OfficialProfileEntity;
}) {
  const imageSrc = officialProfile.photoUrl || PlayerPhotoPlaceholder;

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
