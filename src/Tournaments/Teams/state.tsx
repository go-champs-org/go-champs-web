export interface TournamentTeamEntity {
	id: string;
	name: string;
	stats: { [key: string]: any };
}

export interface TournamentTeamState {
	isLoadingDeleteTournamentTeam: boolean;
	isLoadingPostTournamentTeam: boolean;
	isLoadingRequestTournament: boolean;
	tournamentTeams: { [key: string]: TournamentTeamEntity; };
}

export const initialState: TournamentTeamState = {
	isLoadingDeleteTournamentTeam: false,
	isLoadingPostTournamentTeam: false,
	isLoadingRequestTournament: false,
	tournamentTeams: {},
}