import React from 'react';
import { DrawEntity, DrawMatchEntity } from './state';
import './View.scss';
import classNames from 'classnames';

interface MatchProps {
  match: DrawMatchEntity;
}

const basicTeamClasses = {
  column: true,
  'is-9': true,
  'has-text-left-mobile': true,
  'has-text-centered': true,
  'is-size-5': true
};

const basicScoreClasses = {
  column: true,
  'is-3': true,
  'has-text-right-mobile': true,
  'has-text-centered': true,
  'is-size-5': true
};

const Match: React.FC<MatchProps> = ({ match }) => {
  const firstTeamClasses = classNames(
    {
      'has-text-weight-semibold': match.firstTeamScore > match.secondTeamScore
    },
    basicTeamClasses
  );
  const firstTeamScoreClasses = classNames(
    {
      'has-text-weight-semibold': match.firstTeamScore > match.secondTeamScore
    },
    basicScoreClasses
  );
  const secondTeamClasses = classNames(
    {
      'has-text-weight-semibold': match.secondTeamScore > match.firstTeamScore
    },
    basicTeamClasses
  );
  const secondTeamScoreClasses = classNames(
    {
      'has-text-weight-semibold': match.secondTeamScore > match.firstTeamScore
    },
    basicScoreClasses
  );

  return (
    <div className="card">
      {match.name && (
        <div className="card-header">
          <h2 className="subtitle card-title">{match.name}</h2>
        </div>
      )}

      <div className="card-content">
        <div className="content">
          <div className="columns is-multiline is-vcentered">
            <div className="column">
              <div className="columns is-mobile is-vcentered">
                <div className={firstTeamClasses}>
                  {match.firstTeamPlaceholder}
                </div>

                <div className={firstTeamScoreClasses}>
                  {match.firstTeamScore || 0}
                </div>
              </div>
            </div>

            <div className="column is-1 is-hidden-mobile has-text-centered">
              <span className="icon is-small" style={{ paddingTop: '.8rem' }}>
                <i className="fas fa-times"></i>
              </span>
            </div>

            <div className="column">
              <div className="columns is-mobile reverse-row-order is-vcentered">
                <div className={secondTeamScoreClasses}>
                  {match.secondTeamScore || 0}
                </div>

                <div className={secondTeamClasses}>
                  {match.secondTeamPlaceholder}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {match.info && (
        <footer className="card-footer has-text-centered">
          <span className="card-footer-item has-text-centered is-paddingless">
            {match.info}
          </span>
        </footer>
      )}
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
        <Match match={match} key={match.id} />
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
        <Round draw={draw} key={draw.id} />
      ))}
    </div>
  );
};

export default Bracket;
