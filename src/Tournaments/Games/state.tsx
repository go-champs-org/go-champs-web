import { GameEntity } from "../../Games/state";

export interface TournamentGameEntity {
	id: string;
	game: GameEntity;
}

export interface TournamentGameState {
	isLoadingDeleteTournamentGame: boolean;
	isLoadingPostTournamentGame: boolean;
	isLoadingRequestTournamentGames: boolean;
	tournamentGames: { [key: string]: TournamentGameEntity; };
}

export const initialState: TournamentGameState = {
	isLoadingDeleteTournamentGame: false,
	isLoadingPostTournamentGame: false,
	isLoadingRequestTournamentGames: false,
	tournamentGames: {},
}