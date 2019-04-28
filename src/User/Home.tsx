import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from "react-router-dom";
import { mockUserData, TournamentData } from './data';

const TournamentCard: React.FC<{ tournament: TournamentData, url: string }> = ({ tournament, url }) => {
    return (
        <Link to={`${url}/${tournament.link}`}>
            <div className="card">
                <header className="card-header">
                    <p className="card-title">{tournament.name}</p>
                </header>
            </div>
        </Link>
    );
}

interface MatchParams {
    tournamentId: string;
}

const Home: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
    const user = mockUserData;
    console.log('user home', match.params.tournamentId)
    return (
        <div className="columns is-multiline">
            <div className="column is-12">
                <a href={user.link}>
                    <h1 className="title">{user.name}</h1>
                </a>
            </div>
            <div className="column is-12">
                {user.tournaments.map((tournament: TournamentData) => <TournamentCard tournament={tournament} url={match.url} />)}
            </div>
        </div>
    );
}

export default Home;