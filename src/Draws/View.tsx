import React from 'react';
import { DrawEntity, DrawMatchEntity } from './state';

interface MatchProps {
  match: DrawMatchEntity;
}

const Match: React.FC<MatchProps> = ({ match }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <div className="columns is-multiline is-mobile">
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
    <div className="column is-12">
      <h1 className="subtitle">{draw.title}</h1>

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
    <div className="columns is-multiline">
      {draws.map((draw: DrawEntity) => (
        <Round draw={draw} />
      ))}
    </div>
  );
};

export default Bracket;
