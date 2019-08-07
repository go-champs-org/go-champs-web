import React from 'react';
import { TournamentGroupEntity, TournamentGroupState } from '../Groups/state';
import { TournamentStatEntity, TournamentStatState } from '../Stats/state';
import { NO_GROUP_KEY } from '../Teams/reducer';
import { TournamentTeamEntity, TournamentTeamState } from '../Teams/state';

const TournamentTeamStandingsRow: React.FC<{
  tournamentStats: { [key: string]: TournamentStatEntity };
  tournamentTeam: TournamentTeamEntity;
}> = ({ tournamentStats, tournamentTeam }) => {
  return (
    <tr>
      <td>{tournamentTeam.name}</td>
      {Object.keys(tournamentStats).map((key: string) => (
        <td key={key}>{tournamentTeam.stats[key]}</td>
      ))}
    </tr>
  );
};

const StandingHeader: React.FC<{ tournamentStat: TournamentStatEntity }> = ({
  tournamentStat
}) => <th>{tournamentStat.title}</th>;

const Standings: React.FC<{
  tournamentStats: { [key: string]: TournamentStatEntity };
  tournamentTeams: { [key: string]: TournamentTeamEntity };
}> = ({ tournamentStats, tournamentTeams }) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          {Object.keys(tournamentStats).map((key: string) => (
            <StandingHeader key={key} tournamentStat={tournamentStats[key]} />
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
  tournamentStats: { [key: string]: TournamentStatEntity };
  tournamentTeams: { [key: string]: TournamentTeamEntity };
}> = ({ tournamentGroup, tournamentStats, tournamentTeams }) => {
  return (
    <div>
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
  tournamentStatState: TournamentStatState;
  tournamentTeamState: TournamentTeamState;
}

export const View: React.FC<TournamentStandingsViewProps> = ({
  tournamentGroupState,
  tournamentStatState,
  tournamentTeamState
}) => {
  return (
    <div>
      {tournamentTeamState.tournamentTeamsByGroup[NO_GROUP_KEY] && (
        <Standings
          tournamentStats={tournamentStatState.tournamentStats}
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
            tournamentStats={tournamentStatState.tournamentStats}
            tournamentTeams={tournamentTeamState.tournamentTeamsByGroup[key]}
          />
        ))}
    </div>
  );
};

export default View;
