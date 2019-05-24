import React from 'react';
import { Link } from "react-router-dom";
import { TournamentEntity, TournamentState } from "./state";

const TournamentCard: React.FC<{ tournament: TournamentEntity, url: string, onDeleteTournament: any }> = ({ tournament, url, onDeleteTournament }) => (
  <div>
    <Link to={`${url}/${tournament.slug}`}>
      {tournament.name}
    </Link>
    <button onClick={() => onDeleteTournament(tournament)}>Delete</button>
    <Link to={`${url}/${tournament.slug}/TournamentEdit`}>
      Edit
    </Link>
  </div>
);

const Loading: React.FC = () => (
  <div>Loading...</div>
)

export const List: React.FC<{ tournamentState: TournamentState, url: string, deleteTournament: any }> = ({ tournamentState, url, deleteTournament }) => (
  <div>
    {tournamentState.isLoadingRequestTournaments ?
      <Loading /> :
      Object.keys(tournamentState.tournaments).map((key: string) => <TournamentCard key={key} tournament={tournamentState.tournaments[key]} url={url} onDeleteTournament={deleteTournament} />)
    }
  </div>
);
