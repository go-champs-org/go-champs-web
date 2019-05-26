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
	isLoadingPatchGame: boolean;
	isLoadingPostGame: boolean;
	isLoadingRequestGames: boolean;
	isLoadingRequestTournamentGames: boolean;
	games: { [key: string]: GameEntity; };
}

export const initialState: GameState = {
	isLoadingDeleteGame: false,
	isLoadingPatchGame: false,
	isLoadingPostGame: false,
	isLoadingRequestGames: false,
	isLoadingRequestTournamentGames: false,
	games: {},
}