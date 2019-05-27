import React from 'react';
import { GameEntity } from '../../Games/state';
import { TournamentGameState } from "./state";

const timeFromDate = (date: string) => (
	date.substring(11, 16)
);

const dateFromDate = (date: string) => (
	`${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}`
);

const MiniGameCard: React.FC<{ game: GameEntity }> = ({ game }) => {
	return (
		<div className="card">
			<div className="card-content">
				<div className="columns is-multiline">
					<div className="column is-12 is-size-7 has-text-weight-bold">
						<div className="columns">
							<div className="column is-8" style={{ padding: '.3rem' }}>
								{timeFromDate(game.datetime)}
							</div>
							<div className="column is-4 has-text-right" style={{ padding: '.3rem' }}>
								{game.location}
							</div>
						</div>
					</div>
					<div className="column is-12">
						<div className="columns">
							<div className="column is-8" style={{ padding: '.3rem' }}>
								{game.awayTeamName}
							</div>
							<div className="column is-4 has-text-right" style={{ padding: '.3rem' }}>
								{game.awayScore}
							</div>
						</div>
					</div>
					<div className="column is-12">
						<div className="columns">
							<div className="column is-8" style={{ padding: '.3rem' }}>
								{game.homeTeamName}
							</div>
							<div className="column is-4 has-text-right" style={{ padding: '.3rem' }}>
								{game.homeScore}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const List: React.FC<{ games: { [key: string]: GameEntity } }> = ({ games }) => {
	return (
		<div>
			{Object.keys(games).map((key: string) => <MiniGameCard key={key} game={games[key]} />)}
		</div>
	);
};

const Loading: React.FC = () => (
	<div>Loading...</div>
);

const getNavDates = (dates: string[], selectedDatePosition: number) => ({
	previousDate: dates[selectedDatePosition - 1],
	selectedDate: dates[selectedDatePosition],
	nextDate: dates[selectedDatePosition + 1],
});

interface ListByDateProps {
	tournamentGameState: TournamentGameState;
	initialDatePosition: number;
}

const initialListByDataState = {
	selectedPosition: 0,
}

type State = Readonly<typeof initialListByDataState>;

class ListByDate extends React.Component<ListByDateProps> {
	readonly state: State;

	constructor(props: ListByDateProps) {
		super(props);
		this.state = {
			selectedPosition: this.props.initialDatePosition,
		};
	}

	render() {
		const tournamentGamesByDate = this.props.tournamentGameState.tournamentGamesByDate;
		const {
			previousDate,
			selectedDate,
			nextDate,
		} = getNavDates(Object.keys(tournamentGamesByDate), this.state.selectedPosition);

		return (
			<div>
				<nav className="columns">
					<div className="column is-2">
						<button disabled={!previousDate} className="button" onClick={this.handleDecrementSelectedDatePosition}>
							<span className="icon is-small">
								<i className="fas fa-chevron-left"></i>
							</span>
						</button>
					</div>

					<div className="column has-text-centered">
						{dateFromDate(selectedDate)}
					</div>

					<div className="column is-2 has-text-right">
						<button disabled={!nextDate} className="button" onClick={this.handleIncrementSelectedDatePosition}>
							<span className="icon is-small">
								<i className="fas fa-chevron-right"></i>
							</span>
						</button>
					</div>
				</nav>
				<List games={tournamentGamesByDate[selectedDate]} />
			</div>
		);
	}

	private handleIncrementSelectedDatePosition = () => this.setState(incrementSelectedDatePosition);
	private handleDecrementSelectedDatePosition = () => this.setState(decrementSelectedDatePosition);
};

const incrementSelectedDatePosition = (prevState: State) => ({ selectedPosition: prevState.selectedPosition + 1 });
const decrementSelectedDatePosition = (prevState: State) => ({ selectedPosition: prevState.selectedPosition - 1 });

const findCloserAvailableDatePosition = (currentDate: string, dates: string[]) => {
	if (currentDate > dates[dates.length - 1]) {
		return dates.length - 1;
	}

	for (let index = 0; index < dates.length; index++) {
		if (dates[index] === currentDate) {
			return index;
		} else if (dates[index] > currentDate) {
			return index;
		}
	}
};

const Wrapper: React.FC<{ tournamentGameState: TournamentGameState }> = ({ tournamentGameState }) => {
	if (tournamentGameState.isLoadingRequestTournamentGames) {
		return <Loading />;
	}

	if (Object.keys(tournamentGameState.tournamentGamesByDate).length === 0) {
		return (
			<div>No games</div>
		);
	}

	const currentDate = new Date().toISOString().substring(0, 10);

	const closerAvailableDatePosition = findCloserAvailableDatePosition(currentDate, Object.keys(tournamentGameState.tournamentGamesByDate));

	return (
		<div>
			<h2 className="subtitle">
				Games
			</h2>
			<ListByDate tournamentGameState={tournamentGameState} initialDatePosition={closerAvailableDatePosition!} />
		</div>

	);
};

export default Wrapper;