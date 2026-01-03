import React from 'react';
import { AthleteProfileEntity } from './state';
import PlayerPhotoPlaceholder from '../Players/PlayerPhotoPlaceholder.png';
import './Banner.scss';

function Banner({ athleteProfile }: { athleteProfile: AthleteProfileEntity }) {
  const imageSrc = athleteProfile.photoUrl || PlayerPhotoPlaceholder;
  const hadSocialNetworks =
    athleteProfile.facebook ||
    athleteProfile.instagram ||
    athleteProfile.twitter;
  return (
    <section className="athlete-profile-banner">
      <div className="body">
        <div className="container">
          <div className="columns">
            <div className="column is-3 has-text-centered">
              <img
                src={imageSrc}
                alt={`${athleteProfile.name} profile`}
                className={athleteProfile.photoUrl ? `photo custom` : 'photo'}
              />
            </div>
            <div className="column has-text-centered-mobile">
              <p className="name">{athleteProfile.name}</p>
              {hadSocialNetworks && (
                <div className="social-networks">
                  {athleteProfile.instagram && (
                    <div className="social-networks__item">
                      <a
                        href={`https://instagram.com/${athleteProfile.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-networks__link"
                      >
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  )}
                  {athleteProfile.twitter && (
                    <div className="social-networks__item">
                      <a
                        href={`https://twitter.com/${athleteProfile.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-networks__link"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                    </div>
                  )}
                  {athleteProfile.facebook && (
                    <div className="social-networks__item">
                      <a
                        href={`https://facebook.com/${athleteProfile.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-networks__link"
                      >
                        <i className="fab fa-facebook" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
