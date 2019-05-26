export interface GameEntity {
	id: string;
	awayScore: number;
	awayTeamName: string;
	datetime: string;
	homeScore: number;
	homeTeamName: string;
	location: string;
}

export interface GameState {
	isLoadingDeleteGame: boolean;
	isLoadingPostGame: boolean;
	isLoadingRequestGames: boolean;
	isLoadingRequestTournamentGames: boolean;
	games: { [key: string]: GameEntity; };
}

export const initialState: GameState = {
	isLoadingDeleteGame: false,
	isLoadingPostGame: false,
	isLoadingRequestGames: false,
	isLoadingRequestTournamentGames: false,
	games: {},
}