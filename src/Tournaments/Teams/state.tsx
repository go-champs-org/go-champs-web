export interface TournamentTeamEntity {
	id: string;
	name: string;
	stats: { [key: string]: any };
}

export interface TournamentTeamState {
	isLoadingPostTournamentTeam: boolean;
	tournamentTeams: { [key: string]: TournamentTeamEntity; };
}

export const initialState: TournamentTeamState = {
	isLoadingPostTournamentTeam: false,
	tournamentTeams: {},
}