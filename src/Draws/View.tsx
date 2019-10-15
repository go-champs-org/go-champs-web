import React from 'react';
import { DrawEntity, DrawMatchEntity } from './state';
import './View.scss';

interface MatchProps {
  match: DrawMatchEntity;
}

const Match: React.FC<MatchProps> = ({ match }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <div className="columns is-multiline">
            <div className="column is-9">{match.firstTeamPlaceholder}</div>

            <div className="column is-3 has-text-right">
              {match.firstTeamScore || 0}
            </div>

            <div className="column is-9">{match.secondTeamPlaceholder}</div>

            <div className="column is-3 has-text-right">
              {match.secondTeamScore || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RoundProps {
  draw: DrawEntity;
}

const Round: React.FC<RoundProps> = ({ draw }) => {
  return (
    <div className="round">
      <h1 className="subtitle is-5 has-text-centered">{draw.title}</h1>
      {draw.matches.map((match: DrawMatchEntity) => (
        <Match match={match} />
      ))}
    </div>
  );
};

interface BracketProps {
  draws: DrawEntity[];
}

const Bracket: React.FC<BracketProps> = ({ draws }) => {
  return (
    <div className="bracket-container">
      {draws.map((draw: DrawEntity) => (
        <Round draw={draw} />
      ))}
    </div>
  );
};

export default Bracket;
