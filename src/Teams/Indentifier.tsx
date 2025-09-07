import React from 'react';
import { TeamEntity } from './state';
import './Identifier.scss';

function Identifier({
  team,
  logoSize = 28
}: {
  team: TeamEntity;
  logoSize?: number;
}) {
  const hasLogoAndTriCode = team.logoUrl;

  if (hasLogoAndTriCode) {
    return (
      <div className="team-identifier">
        <img
          src={team.logoUrl}
          alt={team.name}
          className="logo"
          style={{ width: logoSize, height: logoSize }}
        />
        <span className="tri-code">{team.triCode || team.name}</span>
      </div>
    );
  }

  return <span>{team.triCode || team.name}</span>;
}

export default Identifier;
