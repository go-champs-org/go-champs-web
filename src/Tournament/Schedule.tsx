import React from 'react';
import { Game, mockScheduleData } from './data';

const GameRow: React.FC<{ game: Game }> = ({ game }) => {
    return (
        <div className="column is-full columns is-multiline">
            <div className="column is-8">
                {game.homeTeam.name}
            </div>
            <div className="column is-4 has-text-right">{game.homeScore}</div>
            <div className="column is-8">{game.awayTeam.name}</div>
            <div className="column is-4 has-text-right">{game.awayScore}</div>
            <div className="column is-full">{game.time}</div>
        </div>
    );
}

const Schedule: React.FC = () => {
    const schedule = mockScheduleData;
    return (
        <div>
            <div className="columns is-vcentered">
                <div className="column is-3">
                    <a className="button">
                        <span className="icon is-small">
                            <i className="fas fa-angle-left"></i>
                        </span>
                    </a>
                </div>
                <div className="column is-6 has-text-centered">{schedule.date}</div>
                <div className="column is-3 has-text-right">
                    <a className="button">
                        <span className="icon is-small">
                            <i className="fas fa-angle-right"></i>
                        </span>
                    </a>
                </div>
            </div>
            <div className="columns is-multiline">
                {schedule.games.map((game: Game) => <GameRow key={game.id} game={game} />)}
            </div>
        </div>
    );
}

export default Schedule;
