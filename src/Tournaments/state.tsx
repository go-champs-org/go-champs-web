export interface TournamentEntity {
    id: string;
    name: string;
    slug: string;
}

export interface TournamentState {
    isLoadingRequestTournament: boolean;
    isLoadingRequestTournaments: boolean;
    tournaments: { [key: string]: TournamentEntity; };
}

export const initialState: TournamentState = {
    isLoadingRequestTournament: false,
    isLoadingRequestTournaments: false,
    tournaments: {},
}