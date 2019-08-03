import React from 'react';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import { TournamentStatEntity, TournamentStatState } from '../Stats/state';
import { TournamentTeamEntity, TournamentTeamState } from '../Teams/state';
/*
{
	tournamentStats: { [key: string]: TournamentStatEntity };
	tournamentTeam: TournamentTeamEntity;
	url: string;
	patchTournamentTeam: any;
}
{ tournamentStats, tournamentTeam, url, patchTournamentTeam }
*/

const TournamentTeamStandingsCard: React.FC = () => (
  <tr>
    <td>tournamentTeam.name</td>
  </tr>
);

const StandingHeader: React.FC<{ tournamentStat: TournamentStatEntity }> = ({
  tournamentStat
}) => <th>{tournamentStat.title}</th>;

const Standings: React.FC<{
  tournamentStats: { [key: string]: TournamentStatEntity };
  tournamentTeams?: { [key: string]: TournamentTeamEntity };
}> = ({ tournamentStats, tournamentTeams }) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          {Object.keys(tournamentStats).map((key: string) => (
            <StandingHeader tournamentStat={tournamentStats[key]} />
          ))}
        </tr>
      </thead>
    </table>
  );
};

interface TournamentTeamEditProps {
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  patchTournamentTeam: any;
  tournamentState: TournamentState;
  tournamentStatState: TournamentStatState;
  tournamentTeamState: TournamentTeamState;
}

export const Edit: React.FC<TournamentTeamEditProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  patchTournamentTeam,
  tournamentState,
  tournamentStatState,
  tournamentTeamState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];

  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <NavBar
          organizationSlug={currentOrganizationSlug}
          tournament={tournament}
          tournamentSlug={currentTournamentSlug}
        />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-12">
            <h2 className="subtitle">Edit Tournament Standings</h2>
          </div>
        </div>
        <Standings tournamentStats={tournamentStatState.tournamentStats} />
      </div>
    </div>
  );
};

export default Edit;
