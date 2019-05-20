export interface TournamentEntity {
	id: string;
	name: string;
	slug: string;
}

export interface TournamentState {
	isLoadingDeleteTournament: boolean;
	isLoadingPostTournament: boolean;
	isLoadingRequestTournament: boolean;
	isLoadingRequestTournaments: boolean;
	tournaments: { [key: string]: TournamentEntity; };
}

export const initialState: TournamentState = {
	isLoadingDeleteTournament: false,
	isLoadingPostTournament: false,
	isLoadingRequestTournament: false,
	isLoadingRequestTournaments: false,
	tournaments: {},
}