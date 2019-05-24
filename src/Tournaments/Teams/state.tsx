export interface TournamentTeamEntity {
	id: string;
	name: string;
	stats: { [key: string]: any };
}

export interface TournamentTeamState {
	isLoadingDeleteTournamentTeam: boolean;
	isLoadingPatchTournamentTeam: boolean;
	isLoadingPostTournamentTeam: boolean;
	isLoadingRequestTournament: boolean;
	tournamentTeams: { [key: string]: TournamentTeamEntity; };
}

export const initialState: TournamentTeamState = {
	isLoadingDeleteTournamentTeam: false,
	isLoadingPatchTournamentTeam: false,
	isLoadingPostTournamentTeam: false,
	isLoadingRequestTournament: false,
	tournamentTeams: {},
}