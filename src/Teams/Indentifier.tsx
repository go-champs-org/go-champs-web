import React from 'react';
import { TeamEntity } from './state';
import './Identifier.scss';

function Identifier({ team }: { team: TeamEntity }) {
  const hasLogoAndTriCode = team.logoUrl;

  if (hasLogoAndTriCode) {
    return (
      <div className="team-identifier">
        <img src={team.logoUrl} alt={team.name} className="logo" />
        <span className="tri-code">{team.triCode || team.name}</span>
      </div>
    );
  }

  return <span>{team.triCode || team.name}</span>;
}

export default Identifier;
