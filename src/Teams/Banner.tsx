import React from 'react';
import { TeamEntity } from './state';
import TeamLogoPlaceholder from './TeamLogoPlaceholder.png';
import './Banner.scss';

interface BannerProps {
  team: TeamEntity;
}

function Banner({ team }: BannerProps) {
  const imageSrc = team.logoUrl || TeamLogoPlaceholder;

  return (
    <section className="team-banner">
      <div className="body">
        <div className="container">
          <div className="columns">
            <div className="column is-3 has-text-centered">
              <img
                src={imageSrc}
                alt="Team logo"
                className={team.logoUrl ? `logo custom` : 'logo'}
              />
            </div>
            <div className="column has-text-centered-mobile">
              <p className="name">{team.name}</p>
              {team.triCode && <p className="tri-code">{team.triCode}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
