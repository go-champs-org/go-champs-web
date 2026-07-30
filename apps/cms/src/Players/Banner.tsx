import React from 'react';
import { PlayerEntity } from './state';
import PlayerPhotoPlaceholder from './PlayerPhotoPlaceholder.png';
import './Banner.scss';

interface BannerProps {
  player: PlayerEntity;
}

function Banner({ player }: BannerProps) {
  const shirtNumberContent = player.shirtNumber ? `#${player.shirtNumber}` : '';
  const shirtNameContent = player.shirtName ? player.shirtName : '';
  const teamNameContent = player.team ? player.team.name : '';
  const shirtContent = [teamNameContent, shirtNumberContent, shirtNameContent]
    .filter(Boolean)
    .join(' | ');
  const imageSrc = player.photoUrl || PlayerPhotoPlaceholder;
  const hadSocialNetworks =
    player.facebook || player.instagram || player.twitter;
  return (
    <section className="banner">
      <div className="body">
        <div className="container">
          <div className="columns">
            <div className="column is-3 has-text-centered">
              <img
                src={imageSrc}
                alt="Player profile"
                className={player.photoUrl ? `photo custom` : 'photo'}
              />
            </div>
            <div className="column has-text-centered-mobile">
              <p className="name">{player.name}</p>
              {shirtContent && <p className="shirt">{shirtContent}</p>}

              {hadSocialNetworks && (
                <div className="social-networks">
                  {player.instagram && (
                    <div className="social-networks__item">
                      <a
                        href={`https://instagram.com/${player.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-networks__link"
                      >
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  )}
                  {player.twitter && (
                    <div className="social-networks__item">
                      <a
                        href={`https://twitter.com/${player.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-networks__link"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                    </div>
                  )}
                  {player.facebook && (
                    <div className="social-networks__item">
                      <a
                        href={`https://facebook.com/${player.facebook}`}
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
