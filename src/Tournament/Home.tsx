import React from 'react';
import Schedule from './Schedule';
import Standings from './Standings';

const Home: React.FC = () => {
    return (
        <div>
            <Standings />
            <Schedule />
        </div>
    );
}

export default Home;