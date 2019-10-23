import React from 'react';
import { Link } from 'react-router-dom';
import { TournamentEntity } from './state';

const TournamentCard: React.FC<{
  tournament: TournamentEntity;
  url: string;
  onDeleteTournament: any;
}> = ({ tournament, url, onDeleteTournament }) => {
  return (
    <div>
      <Link to={`${url}/${tournament.slug}`}>{tournament.name}</Link>
      <button onClick={() => onDeleteTournament(tournament)}>Delete</button>
      <Link to={`${url}/${tournament.slug}/TournamentEdit`}>Edit</Link>
    </div>
  );
};

export const List: React.FC<{
  tournaments: TournamentEntity[];
  url: string;
  deleteTournament: any;
}> = ({ tournaments, url, deleteTournament }) => (
  <div>
    {tournaments.map((tournament: TournamentEntity) => (
      <TournamentCard
        key={tournament.id}
        tournament={tournament}
        url={url}
        onDeleteTournament={deleteTournament}
      />
    ))}
  </div>
);
