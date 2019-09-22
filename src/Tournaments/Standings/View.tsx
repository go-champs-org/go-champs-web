import React from 'react';
import { TournamentGroupEntity, TournamentGroupState } from '../Groups/state';
import { TournamentStatEntity } from '../Stats/state';
import { NO_GROUP_KEY } from '../Teams/reducer';
import { TournamentTeamEntity, TournamentTeamState } from '../Teams/state';
import './View.scss';

const TournamentTeamStandingsRow: React.FC<{
  tournamentStats: TournamentStatEntity[];
  tournamentTeam: TournamentTeamEntity;
}> = ({ tournamentStats, tournamentTeam }) => {
  return (
    <tr>
      <td style={{ paddingLeft: '0', width: '225px' }}>
        {tournamentTeam.name}
      </td>
      {tournamentStats.map((stat: TournamentStatEntity) => (
        <td key={stat.id} className="has-text-centered">
          {tournamentTeam.stats[stat.id]}
        </td>
      ))}
    </tr>
  );
};

const StandingHeader: React.FC<{ tournamentStat: TournamentStatEntity }> = ({
  tournamentStat
}) => <th className="has-text-centered">{tournamentStat.title}</th>;

const Standings: React.FC<{
  tournamentStats: TournamentStatEntity[];
  tournamentTeams: { [key: string]: TournamentTeamEntity };
}> = ({ tournamentStats, tournamentTeams }) => {
  return (
    <table className="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th style={{ paddingLeft: '0', width: '225px' }}>Name</th>
          {tournamentStats.map((stat: TournamentStatEntity) => (
            <StandingHeader key={stat.id} tournamentStat={stat} />
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(tournamentTeams).map((key: string) => (
          <TournamentTeamStandingsRow
            key={key}
            tournamentStats={tournamentStats}
            tournamentTeam={tournamentTeams[key]}
          />
        ))}
      </tbody>
    </table>
  );
};

const GroupStandings: React.FC<{
  tournamentGroup: TournamentGroupEntity;
  tournamentStats: TournamentStatEntity[];
  tournamentTeams: { [key: string]: TournamentTeamEntity };
}> = ({ tournamentGroup, tournamentStats, tournamentTeams }) => {
  return (
    <div className="group">
      <div className="columns">
        <div className="column is-12">
          <h5 className="subtitle">{tournamentGroup.name}</h5>
        </div>
      </div>
      <Standings
        tournamentStats={tournamentStats}
        tournamentTeams={tournamentTeams}
      />
    </div>
  );
};

interface TournamentStandingsViewProps {
  tournamentGroupState: TournamentGroupState;
  tournamentStats: TournamentStatEntity[];
  tournamentTeamState: TournamentTeamState;
}

export const View: React.FC<TournamentStandingsViewProps> = ({
  tournamentGroupState,
  tournamentStats,
  tournamentTeamState
}) => {
  return (
    <div>
      {tournamentTeamState.tournamentTeamsByGroup[NO_GROUP_KEY] && (
        <Standings
          tournamentStats={tournamentStats}
          tournamentTeams={
            tournamentTeamState.tournamentTeamsByGroup[NO_GROUP_KEY]
          }
        />
      )}
      {Object.keys(tournamentTeamState.tournamentTeamsByGroup)
        .filter((key: string) => key !== NO_GROUP_KEY)
        .map((key: string) => (
          <GroupStandings
            key={key}
            tournamentGroup={tournamentGroupState.tournamentGroups[key]}
            tournamentStats={tournamentStats}
            tournamentTeams={tournamentTeamState.tournamentTeamsByGroup[key]}
          />
        ))}
    </div>
  );
};

export default View;
