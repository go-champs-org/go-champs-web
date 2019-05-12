export interface TournamentEntity {
    id: string;
    name: string;
    slug: string;
}

export interface TournamentState {
    isLoadingRequestTournaments: boolean;
    tournaments: { [key: string]: TournamentEntity; };
}

export const initialState: TournamentState = {
    isLoadingRequestTournaments: false,
    tournaments: {},
}