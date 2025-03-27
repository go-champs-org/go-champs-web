import React from 'react';
import { PlayerEntity } from './state';
import PlayerPhotoPlaceholder from './PlayerPhotoPlaceholder.jpg';
import './Banner.scss';

interface BannerProps {
  player: PlayerEntity;
}

function Banner({ player }: BannerProps) {
  return (
    <section className="banner">
      <div className="body">
        <div className="container">
          <div className="columns">
            <div className="column is-3">
              <figure
                className="image is-128x128"
                style={{ maxWidth: '200px', margin: 'auto' }}
              >
                <img src={PlayerPhotoPlaceholder} alt="Player" />
              </figure>
            </div>
            <div className="column">
              <p className="title">
                {player.name}
                {` | `}
                {player.shirtNumber}
              </p>
              <p className="subtitle">{player.shirtName}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
