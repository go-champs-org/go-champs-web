import React, { Fragment } from 'react';
import { GameEntity } from './state';
import { Trans } from 'react-i18next';
import MiniLiveGameCard from './MiniLiveGameCard';
import MiniGameCard from './MiniGameCard';

function List({ baseUrl, games }: { baseUrl: string; games: GameEntity[] }) {
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
      {games.map((game: GameEntity) => {
        if (game.liveState === 'in_progress') {
          return (
            <MiniLiveGameCard key={game.id} baseUrl={baseUrl} game={game} />
          );
        }
        return <MiniGameCard key={game.id} baseUrl={baseUrl} game={game} />;
      })}
    </div>
  );
}

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
