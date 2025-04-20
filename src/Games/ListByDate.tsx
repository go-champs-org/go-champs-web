import React, { Fragment } from 'react';
import { timeFromDate } from '../Shared/datetime/format';
import classNames from 'classnames';
import { GameEntity } from './state';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import Identifier from '../Teams/Indentifier';

const basicTeamClasses = {
  column: true,
  'is-8': true
};

const basicScoreClasses = {
  column: true,
  'is-4': true,
  'has-text-right': true
};

const MiniGameCard: React.FC<{ baseUrl: string; game: GameEntity }> = ({
  baseUrl,
  game
}) => {
  const awayTeamClasses = classNames(
    {
      'has-text-weight-semibold': game.awayScore > game.homeScore
    },
    basicTeamClasses
  );
  const awayScoreClasses = classNames(
    {
      'has-text-weight-semibold': game.awayScore > game.homeScore
    },
    basicScoreClasses
  );
  const homeTeamClasses = classNames(
    {
      'has-text-weight-semibold': game.homeScore > game.awayScore
    },
    basicTeamClasses
  );
  const homeScoreClasses = classNames(
    {
      'has-text-weight-semibold': game.homeScore > game.awayScore
    },
    basicScoreClasses
  );

  return (
    <div className="card item">
      <Link to={`${baseUrl}/GameView/${game.id}`} className="has-text-dark">
        <div className="card-content">
          <div className="columns is-multiline is-mobile">
            <div className="column is-12 is-size-7 has-text-weight-bold">
              <div className="columns is-mobile">
                <div className="column is-8" style={{ padding: '.3rem' }}>
                  {game.datetime && timeFromDate(game.datetime)}
                </div>

                <div
                  className="column is-4 has-text-right"
                  style={{ padding: '.3rem' }}
                >
                  {game.location}
                </div>
              </div>
            </div>

            <div className="column is-12">
              <div className="columns is-mobile">
                <div className={awayTeamClasses} style={{ padding: '.3rem' }}>
                  {game.awayTeam.id ? (
                    <Identifier team={game.awayTeam} />
                  ) : (
                    game.awayPlaceholder
                  )}
                </div>

                <div className={awayScoreClasses} style={{ padding: '.3rem' }}>
                  {game.isFinished && game.awayScore}
                </div>
              </div>
            </div>

            <div className="column is-12">
              <div className="columns is-mobile">
                <div className={homeTeamClasses} style={{ padding: '.3rem' }}>
                  {game.homeTeam.id ? (
                    <Identifier team={game.homeTeam} />
                  ) : (
                    game.homePlaceholder
                  )}
                </div>

                <div className={homeScoreClasses} style={{ padding: '.3rem' }}>
                  {game.isFinished && game.homeScore}
                </div>
              </div>
            </div>
          </div>
        </div>

        {game.info && (
          <footer className="card-footer has-text-centered">
            <span className="card-footer-item has-text-centered is-paddingless is-size-7">
              {game.info}
            </span>
          </footer>
        )}
      </Link>
    </div>
  );
};

const List: React.FC<{ baseUrl: string; games: GameEntity[] }> = ({
  baseUrl,
  games
}) => {
  if (games.length === 0) {
    return (
      <div className="hero">
        <div className="hero-body">
          <h2
            className="title is-6 has-text-centered"
            style={{ margin: 'auto' }}
          >
            <Trans>noGamesScheduled</Trans>
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      {games.map((game: GameEntity) => (
        <MiniGameCard key={game.id} baseUrl={baseUrl} game={game} />
      ))}
    </div>
  );
};

const getNavDates = (dates: string[], selectedDatePosition: number) => ({
  previousDate: dates[selectedDatePosition - 1],
  selectedDate: dates[selectedDatePosition],
  nextDate: dates[selectedDatePosition + 1]
});

interface ListByDateProps {
  baseUrl: string;
  dates: string[];
  gamesByDate: { [date: string]: GameEntity[] };
  initialDatePosition: number;
}

const initialListByDataState = {
  selectedPosition: 0
};

type State = Readonly<typeof initialListByDataState>;

class ListByDate extends React.Component<ListByDateProps> {
  readonly state: State;

  constructor(props: ListByDateProps) {
    super(props);
    this.state = {
      selectedPosition: this.props.initialDatePosition
    };
  }

  render() {
    const { baseUrl, dates, gamesByDate } = this.props;

    const { previousDate, selectedDate, nextDate } = getNavDates(
      dates,
      this.state.selectedPosition
    );

    return (
      <Fragment>
        <h2 className="subtitle">
          <Trans>games</Trans>
        </h2>

        <nav className="columns is-mobile is-vcentered">
          <div className="column is-2">
            <button
              disabled={!previousDate}
              className="button"
              onClick={this.handleDecrementSelectedDatePosition}
            >
              <span className="icon is-small">
                <i className="fas fa-chevron-left" />
              </span>
            </button>
          </div>

          <div className="column has-text-centered">
            <h2 className="title is-5 notranslate">
              {selectedDate && (
                <Trans values={{ date: selectedDate }}>date</Trans>
              )}
            </h2>
          </div>

          <div className="column is-2 has-text-right">
            <button
              disabled={!nextDate}
              className="button"
              onClick={this.handleIncrementSelectedDatePosition}
            >
              <span className="icon is-small">
                <i className="fas fa-chevron-right" />
              </span>
            </button>
          </div>
        </nav>
        <List baseUrl={baseUrl} games={gamesByDate[selectedDate] || []} />
      </Fragment>
    );
  }

  private handleIncrementSelectedDatePosition = () =>
    this.setState(incrementSelectedDatePosition);
  private handleDecrementSelectedDatePosition = () =>
    this.setState(decrementSelectedDatePosition);
}

const incrementSelectedDatePosition = (prevState: State) => ({
  selectedPosition: prevState.selectedPosition + 1
});
const decrementSelectedDatePosition = (prevState: State) => ({
  selectedPosition: prevState.selectedPosition - 1
});

export default ListByDate;
