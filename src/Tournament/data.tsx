export interface Schedule {
    date: string;
    games: Game[];
}

export interface Game {
    id: string;
    homeTeam: Team;
    homeScore: number;
    awayTeam: Team;
    awayScore: number;
    time: string;
}

export interface Team {
    name: string;
}

export interface TeamStats {
    team: Team;
    stats: { [key: string]: string };
}

export interface StatInfo {
    key: string;
    title: string;
}

export interface StatStructure {
    [position: string]: StatInfo,
}

export const mockTournamentStats: StatStructure = {
    ['0']: {
        key: 'wins',
        title: 'Wins',
    },
    ['1']: {
        key: 'loses',
        title: 'Loses',
    }
}

export interface StandandingStructure {
    [position: string]: TeamStats,
}

export const mockTournamentStandings: StandandingStructure = {
    ['1']: {
        team: { name: 'Panteras' },
        stats: { ['wins']: '9', ['loses']: '1' }
    },
    ['2']: {
        team: { name: 'Titios' },
        stats: { ['wins']: '8', ['loses']: '2' }
    },
    ['3']: {
        team: { name: 'Old School' },
        stats: { ['wins']: '7', ['loses']: '3' }
    },
}

export const mockScheduleData: Schedule = {
    date: '20/10',
    games: [
        {
            id: '1',
            awayScore: 100,
            awayTeam: {
                name: 'São Luís',
            },
            homeScore: 110,
            homeTeam: {
                name: 'Corinthians',
            },
            time: '19:00',
        },
        {
            id: '2',
            awayScore: 90,
            awayTeam: {
                name: 'Panteras',
            },
            homeScore: 80,
            homeTeam: {
                name: 'Veteranos',
            },
            time: '20:00',
        },
        {
            id: '3',
            awayScore: 70,
            awayTeam: {
                name: 'Titios',
            },
            homeScore: 60,
            homeTeam: {
                name: 'Mustangs',
            },
            time: '21:00'
        },
    ],
};

export interface Group {
    name: string;
    standings: StandandingStructure;
}

export interface GroupStructure {
    [key: string]: Group;
}

export const mockGroupData: GroupStructure = {
    ['0']: {
        name: 'Grupo A',
        standings: mockTournamentStandings,
    },
    ['1']: {
        name: 'Group B',
        standings: mockTournamentStandings,
    }
}