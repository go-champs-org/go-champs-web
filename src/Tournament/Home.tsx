import React from 'react';
import Schedule from './Schedule';
import Standings from './Standings';

const Home: React.FC = () => {
    return (
        <div className="columns">
            <div className="column">
                <Standings />
            </div>
            <div className="column is-3">
                <Schedule />
            </div>
        </div>
    );
}

export default Home;