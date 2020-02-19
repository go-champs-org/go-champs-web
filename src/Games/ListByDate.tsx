import React from 'react';
import { dateFromDate, timeFromDate } from '../Shared/datetime/format';
import { GameEntity } from './state';

const MiniGameCard: React.FC<{ game: GameEntity }> = ({ game }) => {
  return (
    <div className="card">
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
              <div className="column is-8" style={{ padding: '.3rem' }}>
                {game.awayTeam.name}
              </div>

              <div
                className="column is-4 has-text-right"
                style={{ padding: '.3rem' }}
              >
                {game.awayScore}
              </div>
            </div>
          </div>

          <div className="column is-12">
            <div className="columns is-mobile">
              <div className="column is-8" style={{ padding: '.3rem' }}>
                {game.homeTeam.name}
              </div>

              <div
                className="column is-4 has-text-right"
                style={{ padding: '.3rem' }}
              >
                {game.homeScore}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const List: React.FC<{ games: GameEntity[] }> = ({ games }) => {
  return (
    <div>
      {games.map((game: GameEntity) => (
        <MiniGameCard key={game.id} game={game} />
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
    const { dates, gamesByDate } = this.props;

    const { previousDate, selectedDate, nextDate } = getNavDates(
      dates,
      this.state.selectedPosition
    );

    return (
      <div>
        <h2 className="subtitle">Games</h2>

        <nav className="columns is-mobile">
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
            {selectedDate && dateFromDate(selectedDate)}
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
        <List games={gamesByDate[selectedDate] || []} />
      </div>
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
