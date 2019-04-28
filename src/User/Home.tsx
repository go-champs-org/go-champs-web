import React from 'react';
import { mockUserData, TournamentData } from './data';

const TournamentCard: React.FC<{ tournament: TournamentData }> = ({ tournament }) => {
    return (
        <div className="card">
            <header className="card-header">
                <p className="card-title">{tournament.name}</p>
            </header>
        </div>
    );
}

const Home: React.FC = () => {
    const user = mockUserData;
    return (
        <div className="columns is-multiline">
            <div className="column is-12">
                <a href={user.link}>
                    <h1 className="title">{user.name}</h1>
                </a>
            </div>
            <div className="column is-12">
                {user.tournaments.map((tournament: TournamentData) => <TournamentCard tournament={tournament} />)}
            </div>
        </div>
    );
}

export default Home;