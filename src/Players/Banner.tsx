import React from 'react';
import { PlayerEntity } from './state';
import PlayerPhotoPlaceholder from './PlayerPhotoPlaceholder.jpg';
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
  return (
    <section className="banner">
      <div className="body">
        <div className="container">
          <div className="columns">
            <div className="column is-3 has-text-centered">
              <img
                src={PlayerPhotoPlaceholder}
                alt="Player profile"
                className="photo"
              />
            </div>
            <div className="column has-text-centered-mobile">
              <p className="name">{player.name}</p>
              {shirtContent && <p className="shirt">{shirtContent}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
