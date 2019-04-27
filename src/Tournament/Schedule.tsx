import React from 'react';

const GameRow: React.FC = () => {
    return (
        <div className="columns">
            <div className="column is-four-fifths">
                <div className="columns is-vcentered">
                    <div className="column">Old School</div>
                    <div className="column is-1">100</div>
                    <div className="column is-1">x</div>
                    <div className="column is-1">101</div>
                    <div className="column">Cosseno</div>
                </div>
            </div>
            <div className="column is-3">
                10:00
            </div>
        </div>
    );
}

const Schedule: React.FC = () => {
    const games = [1, 2, 3, 4];
    return (
        <div className="container">
            <div className="columns is-vcentered">
                <div className="column is-1">
                    <a className="button">
                        <span className="icon is-small">
                            <i className="fas fa-angle-left"></i>
                        </span>
                    </a>
                </div>
                <div className="column">20/10</div>
                <div className="column is-1">
                    <a className="button">
                        <span className="icon is-small">
                            <i className="fas fa-angle-right"></i>
                        </span>
                    </a>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    {games.map((number: number) => <GameRow key={number} />)}
                </div>
            </div>
        </div>
    );
}

export default Schedule;
