import React from 'react';
import { Link } from "react-router-dom";
import { TournamentEntity, TournamentState } from "./state";

const TournamentCard: React.FC<{ tournament: TournamentEntity, url: string }> = ({ tournament, url }) => (
    <div>
        <Link to={`${url}/${tournament.slug}`}>
            {tournament.name}
        </Link>
    </div>
);

const Loading: React.FC = () => (
    <div>Loading...</div>
)

export const List: React.FC<{ tournamentState: TournamentState, url: string }> = ({ tournamentState, url }) => (
    <div>
        {tournamentState.isLoadingRequestTournaments ?
            <Loading /> :
            Object.keys(tournamentState.tournaments).map((key: string) => <TournamentCard key={key} tournament={tournamentState.tournaments[key]} url={url} />)
        }
    </div>
);