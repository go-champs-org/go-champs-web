import React from 'react';
import { mockTournamentData, mockUserData } from './data';
import Schedule from './Schedule';
import Standings from './Standings';

const Home: React.FC = () => {
    const UserData = mockUserData;
    const tournamentData = mockTournamentData;
    return (
        <div className="columns is-multiline">
            <div className="column is-12">
                <h1 className="title">{tournamentData.name}</h1>
                <h2 className="subtitle">{UserData.name}</h2>
            </div>
            <div className="column">
                <Standings />
            </div>
            <div className="column is-4">
                <Schedule />
            </div>
        </div>
    );
}

export default Home;