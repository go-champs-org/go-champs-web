import React from 'react';
import { Game, mockScheduleData } from './data';

const GameRow: React.FC<{ game: Game }> = ({ game }) => {
    return (
        <div className="columns">
            <div className="column is-four-fifths">
                <div className="columns is-vcentered">
                    <div className="column">{game.homeTeam.name}</div>
                    <div className="column is-1">{game.homeScore}</div>
                    <div className="column is-1">x</div>
                    <div className="column is-1">{game.awayScore}</div>
                    <div className="column">{game.awayTeam.name}</div>
                </div>
            </div>
            <div className="column is-3">
                {game.time}
            </div>
        </div>
    );
}

const Schedule: React.FC = () => {
    const schedule = mockScheduleData;
    return (
        <div>
            <div className="columns is-vcentered">
                <div className="column is-1">
                    <a className="button">
                        <span className="icon is-small">
                            <i className="fas fa-angle-left"></i>
                        </span>
                    </a>
                </div>
                <div className="column">{schedule.date}</div>
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
                    {schedule.games.map((game: Game) => <GameRow key={game.id} game={game} />)}
                </div>
            </div>
        </div>
    );
}

export default Schedule;
