import React from 'react';
import { Group, mockGroupData, mockTournamentStats, StandandingStructure, StatInfo, StatStructure, TeamStats } from './data';

const StatRow: React.FC<{ position: string, stats: TeamStats, statStructure: StatStructure }> = ({ position, stats, statStructure }) => {
    return (
        <tr>
            <td>{position}</td>
            <td>{stats.team.name}</td>
            {Object.keys(statStructure).map((key) => <td>{stats.stats[statStructure[key].key]}</td>)}
        </tr>
    );
}

const StatHeader: React.FC<{ stat: StatInfo }> = ({ stat }) => {
    return <th><abbr title={stat.title}>{stat.title}</abbr></th>
}

const Table: React.FC<{ standings: StandandingStructure, statsStructure: StatStructure }> = ({ standings, statsStructure }) => {
    return (
        <table className="table is-fullwidth">
            <thead>
                <tr>
                    <th><abbr title="Position">Pos</abbr></th>
                    <th><abbr title="Team">Team</abbr></th>
                    {Object.keys(statsStructure).map((key: string) => <StatHeader stat={statsStructure[key]} />)}
                </tr>
            </thead>
            <tbody>
                {Object.keys(standings).map((key: string) => <StatRow position={key} stats={standings[key]} statStructure={statsStructure} />)}
            </tbody>
        </table>

    );
}

const GroupComponent: React.FC<{ group: Group, statsStructure: StatStructure }> = ({ group, statsStructure }) => {
    return (
        <div>
            {group.name}
            <Table standings={group.standings} statsStructure={statsStructure} />
        </div>
    )
}

const Standings: React.FC = () => {
    const statsStructure = mockTournamentStats;
    const groups = mockGroupData;
    return (
        <div>
            {Object.keys(groups).map((key: string) => <GroupComponent group={groups[key]} statsStructure={statsStructure} />)}
        </div>
    );
}

export default Standings;