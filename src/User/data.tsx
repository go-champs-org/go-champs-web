export interface TournamentData {
    name: string;
    link: string;
}

export interface UserData {
    name: string;
    link: string;
    tournaments: TournamentData[]
}

export const mockUserData: UserData = {
    name: 'Secretaria Municipal de Esportes Porto Alegre',
    link: 'sec-esportes-poa',
    tournaments: [
        {
            name: 'Liga Municipal de Basquete',
            link: 'liga-municipal-de-basquete',
        },
        {
            name: 'Liga Municipal de Volei',
            link: 'liga-municipal-de-volei',
        }
    ]
}