import React from 'react';
import { TournamentEntity } from './state';
import { initials } from '../Shared/contentHelper';
import './Avatar.scss';

interface TournamentAvatarProps {
  tournament: TournamentEntity;
}

function Avatar({ tournament }: TournamentAvatarProps) {
  if (!tournament.logoUrl) {
    return (
      <div className="tournament-avatar--placeholder">
        {initials(tournament.name)}
      </div>
    );
  }

  return (
    <div className="tournament-avatar">
      <img src={tournament.logoUrl} alt={tournament.name} />
    </div>
  );
}

export default Avatar;
