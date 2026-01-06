import React from 'react';
import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';
import Avatar from '../Organizations/Avatar';
import './MiniCard.scss';
import { Link } from 'react-router-dom';

interface MiniCardProps {
  tournament: ApiTournamentWithDependecies;
}

function MiniCard({ tournament }: MiniCardProps) {
  return (
    <Link to={`/${tournament.organization.slug}/${tournament.slug}`}>
      <div className="tournament-mini-card">
        <header>
          <Avatar organization={tournament.organization} />
          <span>{tournament.name}</span>
        </header>
        <span className="name">{tournament.organization.name}</span>
      </div>
    </Link>
  );
}

export default MiniCard;
