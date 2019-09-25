import React from 'react';
import { PhaseRoundEntity, RoundMatchEntity } from './state';
import './View.scss';

interface MatchProps {
  match: RoundMatchEntity;
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
  round: PhaseRoundEntity;
}

const Round: React.FC<RoundProps> = ({ round }) => {
  return (
    <div className="round">
      <h1 className="subtitle is-5 has-text-centered">{round.title}</h1>
      {round.matches.map((match: RoundMatchEntity) => (
        <Match match={match} />
      ))}
    </div>
  );
};

interface BracketProps {
  rounds: PhaseRoundEntity[];
}

const Bracket: React.FC<BracketProps> = ({ rounds }) => {
  return (
    <div className="bracket-container">
      {rounds.map((round: PhaseRoundEntity) => (
        <Round round={round} />
      ))}
    </div>
  );
};

export default Bracket;
