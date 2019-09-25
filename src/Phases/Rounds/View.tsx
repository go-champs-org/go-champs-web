import React from 'react';
import { PhaseRoundEntity, RoundMatchEntity } from './state';
import './View.scss';

interface MatchProps {
  match: RoundMatchEntity;
}

const Match: React.FC<MatchProps> = ({ match }) => {
  return (
    <div>
      Home Team: {match.firstTeamPlaceholder}
      <br />
      Away Team: {match.secondTeamPlaceholder}
    </div>
  );
};

interface RoundProps {
  round: PhaseRoundEntity;
}

const Round: React.FC<RoundProps> = ({ round }) => {
  return (
    <div>
      <h1>Round: {round.title}</h1>
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
