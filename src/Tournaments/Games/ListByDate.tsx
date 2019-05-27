import React from 'react';
import { GameEntity } from '../../Games/state';
import { TournamentGameState } from "./state";

const MiniGameCard: React.FC<{ game: GameEntity }> = ({ game }) => {
	return (
		<div>
			{game.awayTeamName}: {game.awayScore}
			<br />
			x
			{game.homeTeamName}: {game.homeScore}
			<br />
			{game.location}
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
				<nav>
					<button disabled={!previousDate} onClick={this.handleDecrementSelectedDatePosition}>Previuos</button>
					{selectedDate}
					<button disabled={!nextDate} onClick={this.handleIncrementSelectedDatePosition}>Next</button>
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
		<ListByDate tournamentGameState={tournamentGameState} initialDatePosition={closerAvailableDatePosition!} />
	);
};

export default Wrapper;